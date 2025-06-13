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
      typeof this.allMainLocaleKeysValuePairs[key] === "string" ||
      Array.isArray(this.allMainLocaleKeysValuePairs[key]);

    if (!existsInMainLocale) {
      extraKeys.push(key);
    }
  }

  for (const key of Object.keys(this.allMainLocaleKeysValuePairs)) {
    const existsInTargetLocale =
      typeof keyValuePairs[key] === "string" ||
      Array.isArray(keyValuePairs[key]);

    if (!existsInTargetLocale) {
      missingKeys.push(key);
    }
  }

  logger.blue(`Locale "${locale}":`);

  if (missingKeys.length > 0) {
    for (const key of missingKeys) {
      logger.red(`Missing key: "${key}"`);
    }
  } else {
    logger.green(`No missing keys ✅ `);
  }

  if (extraKeys.length > 0) {
    for (const key of extraKeys) {
      logger.red(`Extra key: "${key}"`);
    }
  } else {
    logger.green(`No extra keys ✅ `);
  }

  this.targetLocalesMeta[locale] = {
    missingKeys,
    extraKeys,
  };
}
