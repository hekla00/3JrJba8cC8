module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '/Users/heklasamuelsdottir/codeChallenge/node_modules/@testing-library/jest-dom',
  ],
};
