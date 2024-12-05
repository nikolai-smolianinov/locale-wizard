#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import * as process from "node:process";
import { program } from "commander";
import { LocaleWizard } from "@/index";
import { WizardConfig } from "@/types/public";

program
  .option("--translate", "Translate missing locale keys")
  .option("--clean", "Remove extra keys")
  .parse();

const options = program.opts();

enum Errors {
  NoRawConfig,
  NoConfigPath,
  InvalidJsonConfig,
  FailedToInit,
  FailedToTranslate,
  FailedToClean,
}

const bootstrap = async () => {
  let config: WizardConfig;
  let configPath: string;
  let rawConfig: string;

  try {
    configPath = path.join(process.cwd(), ".locale-wizard.json");
  } catch {
    throw Errors.NoConfigPath;
  }

  try {
    rawConfig = fs.readFileSync(configPath, "utf8");
  } catch {
    throw Errors.NoRawConfig;
  }

  try {
    config = JSON.parse(rawConfig);
  } catch {
    throw Errors.InvalidJsonConfig;
  }

  let wizard;
  try {
    wizard = new LocaleWizard(config);
  } catch {
    throw Errors.FailedToInit;
  }

  if (options.translate) {
    try {
      await wizard.translate();
    } catch {
      throw Errors.FailedToTranslate;
    }
  }

  if (options.clean) {
    try {
      await wizard.removeExtraKeys();
    } catch {
      throw Errors.FailedToClean;
    }
  }
};

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap().catch((error) => {
  let message = "Unknown error";

  if (error === Errors.NoRawConfig) {
    message = `File ".locale-wizard.json" not found`;
  }

  if (error === Errors.InvalidJsonConfig) {
    message = `File ".locale-wizard.json" should contain a valid JSON`;
  }

  if (error === Errors.FailedToInit) {
    message = `Unknown error occurred while initiating LocaleWizard instance`;
  }

  if (error === Errors.FailedToTranslate) {
    message = `An error occurred while translating`;
  }

  if (error === Errors.FailedToClean) {
    message = `An error occurred while removing extra keys`;
  }

  console.log("\u001B[31m " + message + "\u001B[0m");

  process.exit();
});
