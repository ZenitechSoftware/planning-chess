module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
