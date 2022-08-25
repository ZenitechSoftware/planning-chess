import { roundUp } from '@planning-chess/shared';

describe('calculateScore.ts', function () {
  it('should return rounded number', function () {
    const roundUpNumber = roundUp(6);
    expect(roundUpNumber).toBe(8);
  });
  it('should return 0 if passed 0', function () {
    const roundUpNumber = roundUp(0);
    expect(roundUpNumber).toBe(0);
  });
});
