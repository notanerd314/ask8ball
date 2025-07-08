/** Returns random integer between min and max (inclusive) */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns random item from array */
export function getRandomItem(array: any[]) {
    return array[getRandomInt(0, array.length - 1)];
}