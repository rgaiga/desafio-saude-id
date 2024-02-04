import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleNameMapper: {
        '@products/(.+)': '<rootDir>/src/products/$1',
    },
    preset: 'ts-jest',
    testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
};

export default config;
