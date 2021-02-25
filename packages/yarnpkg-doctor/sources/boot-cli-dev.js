process.env.NODE_OPTIONS += ` --require ${require.resolve(`@orta/yarn-monorepo/scripts/setup-ts-execution`)}`;

require(`@orta/yarn-monorepo/scripts/setup-ts-execution`);

require(`./cli`);
