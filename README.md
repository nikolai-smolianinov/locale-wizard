# Locale Wizard 🧙‍♂️

A powerful tool for managing and auto-translating your application's localization files using OpenAI's GPT models.

## Installation

```bash
npm install locale-wizard -D
```

## Features

- 🌍 Supports 70+ languages
- 🤖 AI-powered translations with context awareness
- 🧹 Automatic cleanup of unused translation keys
- ⚡️ Easy integration with existing projects

## 1. Usage: node.js
```typescript
import { LocaleWizard } from "locale-wizard";

const config: WizardConfig = {
  sourceLocale: "en",
  targetLocales: ["ru", "es", "de"],
  localesPath: "./src/locales",
  openAiKey: "<your-openai-api-key>"
};

const wizard = new LocaleWizard(config);
```

Translates all files in `sourceLocale` to every language in `targetLocales`
```typescript
await wizard.translate();
```

Cleans up any key that exists in any `targetLocales` locale but doesnt exist in `sourceLocale`
```typescript
await wizard.translate();
```
## 2. Usage: terminal
Terminal usage requires a file `.locale-wizard.json` in the root of your project. Format is similar to type `WizardConfig`
```json
{
  "sourceLocale": "en",
  "targetLocales": ["ru", "es", "de"],
  "localesPath": "./src/locales",
  "openAiKey": "<your-openai-api-key>"
}
```
To translate enter:
```bash
locale-wizard --translate
```
To clean extra keys:
```bash
locale-wizard --clean
```
___

## Configuration

```typescript
interface WizardConfig {
  // Source language for translations
  sourceLocale: Locale;
  
  // Languages you want to translate into
  targetLocales: Locale[];
  
  // Directory containing your locale files
  localesPath: string;
  
  // Namespaces to exclude from translation
  ignoreNamespaces?: string[];
  
  // Your OpenAI API key
  // Get it at: https://platform.openai.com/api-keys
  openAiKey?: string;
  
  // OpenAI model to use (defaults to "gpt-4")
  chatGptModel?: OpenAI.ChatModel;
}
```

## Supported Languages

The package supports 70+ languages including:
- 🇺🇸 English (en)
- 🇪🇸 Spanish (es)
- 🇷🇺 Russian (ru)
- 🇩🇪 German (de)
- 🇨🇳 Chinese (zh)
- 🇯🇵 Japanese (ja)
- ...and many more!

[See full list of supported languages](#supported-languages-full)

## Best Practices

1. Always backup your locale files before running translations
2. Start with a small set of translations to verify quality
3. Review automated translations for context-specific accuracy
4. Use `ignoreNamespaces` for technical strings that shouldn't be translated

## License

[MIT](LICENSE) © Nikolai Smolianinov

---

<h2 id="supported-languages-full">Full List of Supported Languages</h2>

```typescript
type Locale = "en" | "ru" | "es" | "zh" | "it" | "ar" | "de" | "fr" | "pt" | "hi" | 
  "ja" | "ko" | "tr" | "nl" | "sv" | "da" | "no" | "fi" | "pl" | "cs" | "sr" | 
  "bg" | "hr" | "el" | "he" | "hu" | "id" | "ms" | "ro" | "sk" | "sl" | "th" | 
  "vi" | "fa" | "ur" | "bn" | "ta" | "te" | "ml" | "kn" | "mr" | "gu" | "ka" | 
  "az" | "be" | "hy" | "et" | "lv" | "lt" | "af" | "sq" | "am" | "eu" | "my" | 
  "ca" | "km" | "ky" | "lo" | "mk" | "mn" | "ne" | "pa" | "si" | "tg" | "tk" | 
  "uz" | "cy" | "yi" | "zu" | "sw" | "so" | "ha" | "ig" | "yo" | "gl" | "is" | 
  "lb" | "mt" | "ps"
```