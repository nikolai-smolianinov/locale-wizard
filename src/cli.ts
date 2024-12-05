#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { program } from "commander";
import { LocaleWizard } from "@/index";
import { WizardConfig } from "@/types/public";

program.option("--translate", "Translate missing locale keys").parse();

const options = program.opts();

const configPath = path.join(process.cwd(), ".locale-wizard.js");
const rawConfig = fs.readFileSync(configPath, "utf8");
const config: WizardConfig = eval(rawConfig);

if (options.translate) {
  try {
    const wizard = new LocaleWizard(config);
    wizard.translate();
  } catch {
    console.error("Config file .locale-wizard.js not found in project root");
  }
}
