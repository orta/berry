module.exports = {
  extends: [
    `@orta`,
    `@orta/yarn-eslint-config/react`
  ],
  ignorePatterns: [
    `packages/plugin-compat/extra/fsevents/fsevents-*.js`,
  ]
};
