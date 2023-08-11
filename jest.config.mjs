/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
