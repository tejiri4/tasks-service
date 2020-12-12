module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      'src/tests/',
    ],
    coverageReporters: [
      'json',
      'text',
      'lcov',
      'clover',
    ],
    testEnvironment: 'node',
    verbose: true,
    transformIgnorePatterns: ['/node_modules/']
  };
  