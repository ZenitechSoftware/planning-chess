export function calculateAverage(moveValues: number[]): number {
  const sum = moveValues.reduce((val, res) => val + res, 0);
  return sum / moveValues.length;
}

export function roundUp(score: number): number {
  if (score == 0) {
    return 0;
  }

  let firstNum = 0;
  let secondNum = 1;
  let thirdNum = firstNum + secondNum;

  while (thirdNum <= score) {
    firstNum = secondNum;
    secondNum = thirdNum;
    thirdNum = firstNum + secondNum;
  }

  const thirdNumberDelta = Math.abs(thirdNum - score);
  const secondNumberDelta = Math.abs(secondNum - score);

  if (thirdNumberDelta > secondNumberDelta) {
    return secondNum;
  } else {
    return thirdNum;
  }
}
