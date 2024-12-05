import path from "node:path";
import OpenAI from "openai";
import { translateLocaleKeys } from "@/translation/translate";
import { Locales, WizardConfig } from "@/types/public";
import { deleteNestedKey } from "@/utils/delete-nested-key";
import {
  getJsonFromFile,
  getLocaleNamespaces,
  writeJsonToFile,
} from "@/utils/files";
import { flattenToNested } from "@/utils/flaten-to-nested";
import { getAllLocaleKeyValues } from "@/utils/get-all-locale-key-values";
import { getNameSpaces } from "@/utils/get-name-spaces";
import { processLocale } from "@/utils/process-locale";

type TargetLocaleMeta = { extraKeys: string[]; missingKeys: string[] };

export class LocaleWizard {
  readonly openai: OpenAI | null = null;
  readonly chatGptModel: OpenAI.ChatModel = "gpt-4o";
  readonly targetLocales: string[] = [];
  readonly localesPath: string = "";
  readonly ignoreNamespaces: string[] = [];
  readonly allMainLocaleKeysValuePairs: Record<string, string> = {};
  readonly targetLocalesMeta: Record<string, TargetLocaleMeta> = {};
  private readonly mainLocaleFiles: string[] = [];

  constructor(private config: WizardConfig) {
    this.targetLocales = config.targetLocales;
    this.localesPath = path.resolve(process.cwd(), config.localesPath);
    this.ignoreNamespaces = config.ignoreNamespaces || [];

    this.mainLocaleFiles = getLocaleNamespaces(
      config.localesPath,
      config.sourceLocale,
    );

    this.allMainLocaleKeysValuePairs = getAllLocaleKeyValues(
      this.localesPath,
      config.sourceLocale,
    );

    for (const locale of config.targetLocales) {
      processLocale.call(this, locale);
    }

    if (config.openAiKey) {
      this.openai = new OpenAI({
        apiKey: config.openAiKey,
      });
    }

    if (config.chatGptModel) {
      this.chatGptModel = config.chatGptModel;
    }
  }

  async translate() {
    for (const [_locale, { missingKeys }] of Object.entries(
      this.targetLocalesMeta,
    )) {
      const locale = _locale as Locales;

      const keyPairsToTranslate = missingKeys.reduce((accumulator, key) => {
        return { ...accumulator, [key]: this.allMainLocaleKeysValuePairs[key] };
      }, {});

      const translatedPairs = await translateLocaleKeys.call(
        this,
        keyPairsToTranslate,
        locale,
      );

      const namespaces = getNameSpaces(translatedPairs);

      for (const [namespace, pairs] of Object.entries(namespaces)) {
        const namespacePath = `${this.localesPath}/${locale}/${namespace}.json`;
        const currentContent = getJsonFromFile(namespacePath);
        let newContent = flattenToNested({ ...currentContent, ...pairs });

        writeJsonToFile(namespacePath, newContent);
      }
    }
  }

  async removeExtraKeys() {
    for (const [locale, { extraKeys }] of Object.entries(
      this.targetLocalesMeta,
    )) {
      const files = getLocaleNamespaces(this.localesPath, locale);
      for (const file of files) {
        const filePath = `${this.localesPath}/${locale}/${file}`;
        const content = getJsonFromFile(filePath);

        let newContent = {};

        if (extraKeys.length > 0) {
          for (const key of extraKeys) {
            newContent = deleteNestedKey(content, key.split(":")[1]);
          }

          writeJsonToFile(filePath, newContent);
        }
      }
    }
  }
}
