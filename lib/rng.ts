/** 
 * Returns random integer between min and max (inclusive)
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer within range
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 
 * Returns random item from array
 * @param array - Array to select from
 * @returns Random item from the array
 */
export function getRandomItem(array: any[]) {
    return array[getRandomInt(0, array.length - 1)];
}