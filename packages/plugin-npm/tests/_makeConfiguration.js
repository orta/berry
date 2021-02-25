import {Configuration} from '@orta/yarn-core';

export const makeConfiguration = () => Configuration.find(__dirname, {
  modules: new Map([
    [`@orta/yarn-core`, require(`@orta/yarn-core`)],
    [`@orta/yarn-fslib`, require(`@orta/yarn-core`)],
    [`@orta/yarn-plugin-npm`, require(`@orta/yarn-plugin-npm`)],
  ]),
  plugins: new Set([
    `@orta/yarn-plugin-npm`,
  ]),
}, {
  useRc: false,
  strict: false,
});
