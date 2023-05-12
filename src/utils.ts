/**
 * The function shuffles an array randomly.
 * @param {any[]} array - The parameter "array" is an array of any type of elements
 * that needs to be shuffled randomly.
 */

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
