import { Locales, localesNames } from "@/types/public";

export const getPrompt = (
  keyValuePairs: Record<string, string>,
  targetLocale: Locales,
) => {
  const localeString = localesNames[targetLocale];

  return `Given a JSON file in the format {[key]: [value]}\n\n${JSON.stringify(keyValuePairs)}\n\nTranslate all values to ${localeString} language and return the completed JSON\n\nTry to understand the context for more accurate translation.\nIf its possible try to understand correct plural forms of words(keep in mind that some languages have multiple plural forms (like in Russian: "one window", "two windows", "five windows" becomes "одно окНО", "два окНА", "пять окОН"))\n\nMost important: Return ONLY the JSON in your response. No extra words or explanations`;
};
