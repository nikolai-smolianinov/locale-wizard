export const areKeysTheSame = (
  object1: Record<string, any>,
  object2: Record<string, any>,
) => {
  const keys1 = Object.keys(object1).sort();
  const keys2 = Object.keys(object2).sort();

  return JSON.stringify(keys1) === JSON.stringify(keys2);
};
