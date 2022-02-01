module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules'],
  collectCoverage: true,
  collectCoverageFrom: ['lib/**', '!lib/index.ts'],
  testPathIgnorePatterns: ['dist'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
