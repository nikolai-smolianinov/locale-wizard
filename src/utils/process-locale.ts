import { LocaleWizard } from "@/index";
import { logger } from "@/logger";
import { getAllLocaleKeyValues } from "@/utils/get-all-locale-key-values";

export function processLocale(this: LocaleWizard, locale: string) {
  const missingKeys = [];
  const extraKeys = [];

  const keyValuePairs = getAllLocaleKeyValues(
    this.localesPath,
    locale,
    this.ignoreNamespaces,
  );

  for (const key of Object.keys(keyValuePairs)) {
    const existsInMainLocale =
      typeof this.allMainLocaleKeysValuePairs[key] === "string";

    if (!existsInMainLocale) {
      extraKeys.push(key);
    }
  }

  for (const key of Object.keys(this.allMainLocaleKeysValuePairs)) {
    const existsInTargetLocale = typeof keyValuePairs[key] === "string";

    if (!existsInTargetLocale) {
      missingKeys.push(key);
    }
  }

  logger.blue(`Locale "${locale}":`);

  missingKeys.length > 0
    ? logger.red(`Missing keys: ${missingKeys.length}`)
    : logger.green(`Missing keys: ${missingKeys.length}`);

  extraKeys.length > 0
    ? logger.red(`Extra keys: ${extraKeys.length}\n`)
    : logger.green(`Extra keys: ${extraKeys.length}\n`);

  this.targetLocalesMeta[locale] = {
    missingKeys,
    extraKeys,
  };
}
