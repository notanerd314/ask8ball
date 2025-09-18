/** 
 * Returns random integer between min and max (inclusive)
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer within range
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 
 * Returns random item from array
 * @param array - Array to select from
 * @returns Random item from the array
 */
export function getRandomItem(array: any[]): any {
  return array[getRandomInt(0, array.length - 1)];
}

/**
 * Generates a random string from a set of 0-9, a-z characters.
 * @param length - Length of the random string
 * @returns A randomized string
 */
export function getRandomString(length: number = 10): string {
  return [...Array(length)]
    .map(() => Math.random().toString(36)[2]) // 0-9, a-z
    .join('');
}