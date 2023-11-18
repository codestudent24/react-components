module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/assets/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/assets/styleMock.js',
  },
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
