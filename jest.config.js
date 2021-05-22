module.exports = {
  testPathIgnorePatterns: ["./node_modules", "./next"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**",
    "!./src/styles/**",
    "!./src/services/**",
    "!./src/@types/**",
    "!./src/hooks/**",
  ],
  coverageDirectory: "./src/tests/coverage",
};
