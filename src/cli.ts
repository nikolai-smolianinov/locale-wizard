#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { program } from "commander";
import { LocaleWizard } from "@/index";
import { WizardConfig } from "@/types/public";

program.option("--translate", "Translate missing locale keys").parse();

const options = program.opts();

const configPath = path.join(process.cwd(), ".locale-wizard.json");
const rawConfig = fs.readFileSync(configPath, "utf8");
let config: WizardConfig | null;

try {
  config = JSON.parse(rawConfig);
} catch {
  config = null;
}

if (!config) {
  throw new Error(`Couldn't fine valid config file at "${configPath}"`);
}

if (options.translate) {
  try {
    const wizard = new LocaleWizard(config);
    wizard.translate();
  } catch {
    console.error("Config file .locale-wizard.json not found in project root");
  }
}
