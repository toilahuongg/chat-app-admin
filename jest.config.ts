import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@client/(.*)$': '<rootDir>/client/$1',
    '^@dashboard/(.*)$': '<rootDir>/dashboard/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
  },
};

export default jestConfig;
