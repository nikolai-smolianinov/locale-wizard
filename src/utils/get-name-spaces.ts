export const getNameSpaces = (keyValuePairs: Record<string, string>) => {
  const namespaces: Record<string, Record<string, string>> = {};

  for (const [fullKey, value] of Object.entries(keyValuePairs)) {
    const [namespace, key] = fullKey.split(":");

    namespaces[namespace] = {
      ...namespaces[namespace],
      [key]: value,
    };
  }

  return namespaces;
};
