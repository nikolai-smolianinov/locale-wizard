import fs from "node:fs";
import path from "node:path";
import { logger } from "@/logger";

export const getLocaleNamespaces = (directory: string, locale: string) => {
  try {
    return fs.readdirSync(`${directory}/${locale}`);
  } catch {
    return [];
  }
};

export const getJsonFromFile = (filePath: string) => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch {
    return {};
  }
};

export const writeJsonToFile = (filePath: string, data: object) => {
  try {
    // Получаем абсолютный путь
    const absolutePath = path.resolve(filePath);

    // Получаем директорию из абсолютного пути
    const directory = path.dirname(absolutePath);

    // Проверяем существует ли директория, если нет - создаем рекурсивно
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Записываем файл
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(absolutePath, jsonContent, "utf8");

    return true;
  } catch (error: any) {
    logger.red(`Error writing file ${filePath}: ${error.message}`);
    logger.red(`Stack: ${error.stack}`);
    return false;
  }
};
