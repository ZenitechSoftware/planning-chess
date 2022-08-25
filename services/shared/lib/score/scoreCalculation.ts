export function calculateAverage(moveValues: number[]): number {
  const sum = moveValues.reduce((val, res) => val + res);
  return sum / moveValues.length;
}

export function roundUp(score: number): number {
  if (score == 0) {
    return 0;
  }
  let firstNumber = 0;
  let secondNumber = 1;
  let thirdNumber = firstNumber + secondNumber;
  while (thirdNumber <= score) {
    firstNumber = secondNumber;
    secondNumber = thirdNumber;
    thirdNumber = firstNumber + secondNumber;
  }
  return secondNumber - score == 0 ? secondNumber : thirdNumber;
}
