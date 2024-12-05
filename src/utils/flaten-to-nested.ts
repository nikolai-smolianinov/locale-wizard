export const flattenToNested = (object: Record<string, string>): object => {
  const result: any = {};

  for (const key in object) {
    const parts = key.split(".");
    let current = result;

    for (let index = 0; index < parts.length - 1; index++) {
      const part = parts[index];
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }

    current[parts.at(-1) as string] = object[key];
  }

  return result;
};
