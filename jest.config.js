module.exports = {
  testPathsIgnorePatterns: ["./node_modules", "./next"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },
};
