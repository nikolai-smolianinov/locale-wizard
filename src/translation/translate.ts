import * as process from "node:process";
import { LocaleWizard } from "@/index";
import { logger } from "@/logger";
import { getPrompt } from "@/translation/get-prompt";
import { Locales } from "@/types/public";
import { areKeysTheSame } from "@/utils/compare-keys";
import { sleep } from "@/utils/sleep";
import { splitRecord } from "@/utils/split-record";

export async function translateLocaleKeys(
  this: LocaleWizard,
  keyValuePairs: Record<string, string>,
  targetLocale: Locales,
) {
  if (!this.openai) {
    logger.red(`openai is not initialized`);

    return process.exit();
  }

  const chunks = splitRecord(keyValuePairs);

  let result: Record<string, string> = {};
  let tokenCost = 0;

  if (Object.keys(keyValuePairs).length === 0) {
    return result;
  }

  logger.blue(`Translating "${targetLocale}" locale`);

  for (const chunk of chunks) {
    const translatedChunk = await translateChunk.call(
      this,
      chunk,
      targetLocale,
    );

    result = { ...result, ...translatedChunk.translated };
    tokenCost += translatedChunk.cost || 0;
  }

  logger.green(
    `Locale "${targetLocale}" successfully translated!!! Cost: ${tokenCost} tokens\n`,
  );

  return result;
}

export async function translateChunk(
  this: LocaleWizard,
  chunk: Record<string, string>,
  targetLocale: Locales,
  isRetry?: boolean,
): Promise<{ translated: Record<string, string>; cost: number | undefined }> {
  if (!this.openai) {
    logger.red(`openai is not initialized`);
    process.exit();
  }

  const prompt = this.customPrompt
    ? this.customPrompt(targetLocale, chunk)
    : getPrompt(chunk, targetLocale);

  try {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: this.chatGptModel,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0].message.content;

    if (typeof responseText !== "string") {
      throw new TypeError(`Invalid ChatGPT response`);
    }

    const cost = completion.usage?.total_tokens;

    const result = JSON.parse(responseText) as Record<string, string>;

    const isTheSame = areKeysTheSame(chunk, result);

    if (isTheSame) {
      // added sleep in order not to exceed rate limits
      await sleep(500);
      return { translated: result, cost };
    } else {
      if (isRetry) {
        logger.red(`Failed to retry translation "${targetLocale}" locale.`);
        process.exit();
        throw new Error(`Failed to translate "${targetLocale}" locale`);
      } else {
        logger.yellow(
          `Failed to translate "${targetLocale}" locale. Retrying...`,
        );

        const retry = await translateChunk.call(
          this,
          chunk,
          targetLocale,
          true,
        );

        logger.green(
          `Successfully retried translation of "${targetLocale}" locale!`,
        );
        return retry;
      }
    }
  } catch (error: any) {
    throw error;
  }
}
