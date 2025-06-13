export const flattenToNested = (object: Record<string, string>): object => {
  const result: any = {};

  console.log("flaten", object);

  for (const key in object) {
    const parts = key.split(".");

    if (parts.length === 1) {
      // Обычный ключ без точек
      result[key] = object[key];
    } else {
      // Вложенный ключ с точками
      const parentKey = parts[0];
      const childKey = parts[1];

      // Проверяем, является ли childKey числовым индексом
      const isArrayIndex = /^\d+$/.test(childKey);

      if (isArrayIndex) {
        // Если это числовой индекс, создаем массив
        if (!result[parentKey]) {
          result[parentKey] = [];
        }

        const index = Number.parseInt(childKey, 10);
        result[parentKey][index] = object[key];
      } else {
        // Обычный вложенный объект
        if (!result[parentKey]) {
          result[parentKey] = {};
        }

        if (!(childKey in result[parentKey])) {
          result[parentKey][childKey] = object[key];
        }
      }
    }
  }
  console.log("nested", result);
  return result;
};
