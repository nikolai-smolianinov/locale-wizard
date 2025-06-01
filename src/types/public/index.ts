import OpenAI from "openai";

export const localesNames = {
  en: "English",
  ru: "Russian",
  es: "Spanish",
  zh: "Chinese",
  it: "Italian",
  ar: "Arabic",
  de: "German",
  fr: "French",
  pt: "Portuguese",
  hi: "Hindi",
  ja: "Japanese",
  ko: "Korean",
  tr: "Turkish",
  nl: "Dutch",
  sv: "Swedish",
  da: "Danish",
  no: "Norwegian",
  fi: "Finnish",
  pl: "Polish",
  cs: "Czech",
  sr: "Serbian",
  bg: "Bulgarian",
  hr: "Croatian",
  el: "Greek",
  he: "Hebrew",
  hu: "Hungarian",
  id: "Indonesian",
  ms: "Malay",
  ro: "Romanian",
  sk: "Slovak",
  sl: "Slovenian",
  th: "Thai",
  vi: "Vietnamese",
  fa: "Persian",
  ur: "Urdu",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  ml: "Malayalam",
  kn: "Kannada",
  mr: "Marathi",
  gu: "Gujarati",
  ka: "Georgian",
  az: "Azerbaijani",
  be: "Belarusian",
  hy: "Armenian",
  et: "Estonian",
  lv: "Latvian",
  lt: "Lithuanian",
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  eu: "Basque",
  my: "Burmese",
  ca: "Catalan",
  km: "Khmer",
  ky: "Kyrgyz",
  lo: "Lao",
  mk: "Macedonian",
  mn: "Mongolian",
  ne: "Nepali",
  pa: "Punjabi",
  si: "Sinhala",
  tg: "Tajik",
  tk: "Turkmen",
  uz: "Uzbek",
  cy: "Welsh",
  yi: "Yiddish",
  zu: "Zulu",
  sw: "Swahili",
  so: "Somali",
  ha: "Hausa",
  ig: "Igbo",
  yo: "Yoruba",
  gl: "Galician",
  is: "Icelandic",
  lb: "Luxembourgish",
  mt: "Maltese",
  ps: "Pashto",
} as const;

export type Locales = keyof typeof localesNames;

export interface WizardConfig {
  // Main locale
  sourceLocale: Locales;
  // Locales thar you wish to be translated
  targetLocales: Locales[];
  // Path to directories with your locales
  localesPath: string;
  // Namespaces that should not be translated
  ignoreNamespaces?: string[];
  // OpenAI API key. Required for translation. Can be obtained at https://platform.openai.com/api-keys
  openAiKey?: string;
  // Chat GPT model that will be used to for translation. Defaults to "gpt-4o"
  chatGptModel?: OpenAI.ChatModel;
  /**
   * Custom prompt to ChatGPT
   * Use it if you need to include more context
   *
   * @param locale - current locale that is being translated, for example - "en"
   * @param keyValuePairs - key-value pairs, for example {hello: "Hello!", saveBtnText: "Click to save"} etc.
   * @return string - a string that will be passed as prompt to ChatGPT
   */
  customPrompt?: (
    locale: string,
    keyValuePairs: Record<string, string>,
  ) => string;
}
