require(`@orta/yarn-monorepo/scripts/setup-ts-execution`);

const {makeConfig} = require(`@orta/yarn-builder/sources/tools/makeConfig`);

module.exports = makeConfig({
  context: __dirname,

  mode: `production`,
  optimization: {
    minimize: false,
  },

  entry: {
    [`index`]: `./sources/index.ts`,
    [`microkernel`]: `./sources/microkernel.ts`,
  },

  output: {
    filename: `[name].js`,
    path: `${__dirname}/lib`,
  },
});
