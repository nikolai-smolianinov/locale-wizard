import path from "node:path";
import * as process from "node:process";
import dotenv from "dotenv";
import { LocaleWizard } from "@/index";
const environment = process.env.NODE_ENV || "local";
const environmentPath = path.resolve(`.env.${environment}`);

dotenv.config({ path: environmentPath });

const openAiKey = process.env.OPEN_AI_KEY;

if (!openAiKey) {
  throw new Error(`OPEN_AI_KEY is not specified in .env.${environment}`);
}

const bootstrap = async () => {
  const wizard = new LocaleWizard({
    sourceLocale: "ru",
    targetLocales: ["en"],
    ignoreNamespaces: ["inter"],
    localesPath: "locales",
    openAiKey: openAiKey,
    customPrompt: (locale) => `переведи json на локаль "${locale}"`,
  });

  // await wizard.removeExtraKeys();
  await wizard.translate();
};

bootstrap();
