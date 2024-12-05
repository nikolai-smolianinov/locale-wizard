export function deleteNestedKey(object: any, path: any) {
  const keys = path.split(".");

  function deleteRecursive(current: any, index: any) {
    if (index >= keys.length) return;

    const key = keys[index];

    // Если мы достигли предпоследнего ключа в пути
    if (index === keys.length - 1) {
      delete current[key];
    } else {
      // Продолжаем идти по пути
      if (current[key]) {
        deleteRecursive(current[key], index + 1);
      }
    }

    // Если текущий объект пустой после удаления, удаляем его из родительского объекта
    if (Object.keys(current[key] || {}).length === 0) {
      delete current[key];
    }
  }

  deleteRecursive(object, 0);

  return object;
}
