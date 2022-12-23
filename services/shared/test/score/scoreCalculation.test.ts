import { calculateAverage, roundUp } from '../../lib';

describe('Score calculation lib test', () => {
  it('should return calculated average number', () => {
    const arr = [1, 2, 3, 4];
    expect(calculateAverage(arr)).toBe(2.5);
  });
  it('should return rounded number to higher value', () => {
    const roundUpNumber = roundUp(10.5);
    expect(roundUpNumber).toBe(13);
  });
  it('should return rounded number to lower value', () => {
    const roundUpNumber = roundUp(3.3);
    expect(roundUpNumber).toBe(3);
  });
  it('should return rounded same number', () => {
    const roundUpNumber = roundUp(5);
    expect(roundUpNumber).toBe(5);
  });
  it('should return 0 if passed 0', () => {
    const roundUpNumber = roundUp(0);
    expect(roundUpNumber).toBe(0);
  });
});
