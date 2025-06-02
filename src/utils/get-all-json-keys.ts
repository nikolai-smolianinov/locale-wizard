export function getAllJsonKeys(object: Record<string, any>, currentPath = "") {
  let paths: string[] = [];
  for (const key in object) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    if (
      typeof object[key] === "object" &&
      object[key] !== null &&
      !Array.isArray(object[key])
    ) {
      paths = [...paths, ...getAllJsonKeys(object[key], newPath)];
    } else {
      paths.push(newPath);
    }
  }
  return paths.map((s) => s.replace(":.", ":"));
}
