/**
 * Generates a unique key for React elements.
 *
 * @returns {number} A unique key number.
 *
 * @example
 * ```js
 * const key = getKey(); // 1, 2, 3, ...
 * ```
 */
let key = 0;
export const getKey = (): number => ++key;
