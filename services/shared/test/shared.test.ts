import { createInitialState, reduce } from '../lib/shared';

describe('Shared component tests', () => {
  it('should call reduce', () => {
    reduce();
  });

  it('should call createInitialState', () => {
    createInitialState();
  });
});
