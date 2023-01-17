// eslint-disable-next-line no-undef
module.exports = {
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['node_modules/(?!nanoid)/'],
  moduleNameMapper: {
    '\\.(css|less|svg)$': '<rootDir>/src/test/__mocks__/styleMock.js',
    "^nanoid(/(.*)|$)": "nanoid$1",
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
