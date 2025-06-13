import { Locales, localesNames } from "@/types/public";

export const getPrompt = (targetLocale: Locales) => {
  const localeString = localesNames[targetLocale];

  return `You will be given a JSON file in the format {[key]: [value]}
  Translate all values to ${localeString} language and return the completed JSON with translated values
  
  Try to understand the context for more accurate translation.
  Make all the efforts to understand correct plural forms of words(keep in mind that some languages have multiple plural forms (like in Russian: "one window", "two windows", "five windows" becomes "одно окНО", "два окНА", "пять окОН"))
  Most important: Return ONLY the JSON in your response. No extra words or explanations
  `;
};
