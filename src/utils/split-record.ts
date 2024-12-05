/**
 * Splits a Record<string, string> into an array of smaller Records,
 * each containing no more than maxKeys entries
 *
 * @param record - The input Record to split
 * @param maxKeys - Maximum number of keys per resulting object
 * @returns Array of Records
 */
export function splitRecord(
  record: Record<string, string>,
  maxKeys: number = 50,
): Record<string, string>[] {
  // Get entries from record
  const entries = Object.entries(record);

  // If entries length is less than or equal to maxKeys, return original record in array
  if (entries.length <= maxKeys) {
    return [record];
  }

  // Calculate number of objects needed
  const numberObjects = Math.ceil(entries.length / maxKeys);
  const result: Record<string, string>[] = [];

  // Split entries into chunks
  for (let index = 0; index < numberObjects; index++) {
    const start = index * maxKeys;
    const chunk = entries.slice(start, start + maxKeys);
    result.push(Object.fromEntries(chunk));
  }

  return result;
}
