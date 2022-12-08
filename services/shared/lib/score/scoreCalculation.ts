export function calculateAverage(moveValues: number[]): number {
  const sum = moveValues.reduce((val, res) => val + res);
  return sum / moveValues.length;
}

export function roundUp(score: number): number {
  if (score == 0) {
    return 0;
  }

  let firstNum = 0;
  let secondNum = 1;
  let thirdNum = firstNum + secondNum;

  while(thirdNum <= score) {
    firstNum = secondNum;
    secondNum = thirdNum;
    thirdNum = firstNum + secondNum;
  }

  if(Math.abs(thirdNum - score) === Math.abs(secondNum - score)) return thirdNum;
  return (Math.abs(thirdNum - score) >= Math.abs(secondNum - score)) ? secondNum : thirdNum;
}
