module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@config/(.*)': '<rootDir>/src/shared/config/$1',
    '@datasource/(.*)': '<rootDir>/src/shared/datasource/$1',
  },
};
