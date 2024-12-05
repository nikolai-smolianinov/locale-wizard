type NestedObject = {
  [key: string]: string | NestedObject;
};

export const getValueByPath = (
  object: NestedObject,
  path: string,
): string | undefined => {
  const keys = path.split(".");

  let result: any = object;

  for (const key of keys) {
    if (result === undefined || result === null) {
      return undefined;
    }

    result = result[key];
  }

  return result as string;
};
