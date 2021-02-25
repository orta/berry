module.exports = Object.assign({}, require(`@orta/yarn-monorepo/jest.config.js`), {
  modulePathIgnorePatterns: [`pkg-tests-fixtures`],
  setupFilesAfterEnv: [require.resolve(`./yarn.setup.ts`)],
});
