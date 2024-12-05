import { getJsonFromFile, getLocaleNamespaces } from "@/utils/files";
import { getAllJsonKeys } from "@/utils/get-all-json-keys";
import { getValueByPath } from "@/utils/get-value-by-path";

export function getAllLocaleKeyValues(
  path: string,
  locale: string,
): Record<string, string> {
  const files = getLocaleNamespaces(path, locale);

  let allKeys: Record<string, string> = {};

  for (const fileName of files) {
    const filePath = `${path}/${locale}/${fileName}`;
    const nameSpace = fileName.split(".json")[0];

    const fileObject = getJsonFromFile(filePath);

    const keys = getAllJsonKeys(fileObject);

    for (const key of keys) {
      const value = getValueByPath(fileObject, key);

      allKeys[nameSpace + ":" + key] = value || "";
    }
  }

  return allKeys;
}
