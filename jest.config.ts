import { type Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/domain/**/*.ts',
    '!<rootDir>/src/data/protocols/*.ts',
    '!<rootDir>/src/presentation/protocols/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': '@swc/jest'
  }
}

export default config
