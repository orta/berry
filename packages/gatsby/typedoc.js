const path = require(`path`);

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: `Yarn API`,
  tsconfig: require.resolve(`@orta/yarn-monorepo/tsconfig.json`),
  inputFiles: [`../.`],
  mode: `modules`,
  out: `./static/api`,
  theme: `${path.dirname(require.resolve(`typedoc-neo-theme/package.json`))}/bin/default`,
  plugin: [`typedoc-plugin-yarn`, `typedoc-neo-theme`, `@strictsoftware/typedoc-plugin-monorepo`],
  'external-modulemap': `.*packages/([^/]+)/.*`,
  ignoreCompilerErrors: true,
  links: [
    {
      label: `Home`,
      url: `/`,
    },
    {
      label: `Configuration`,
      url: `/configuration`,
    },
    {
      label: `Features`,
      url: `/features`,
    },
    {
      label: `CLI`,
      url: `/cli`,
    },
    {
      label: `Advanced`,
      url: `/advanced`,
    },
    {
      label: `GitHub`,
      url: `https://github.com/yarnpkg/berry`,
    },
  ],
  outline: [
    {
      "Generic Packages": {
        "@orta/yarn-core": `yarnpkg_core`,
        "@orta/yarn-fslib": `yarnpkg_fslib`,
        "@orta/yarn-json-proxy": `yarnpkg_json_proxy`,
        "@orta/yarn-libzip": `yarnpkg_libzip`,
        "@orta/yarn-parsers": `yarnpkg_parsers`,
        "@orta/yarn-pnp": `yarnpkg_pnp`,
        "@orta/yarn-pnpify": `yarnpkg_pnpify`,
        "@orta/yarn-shell": `yarnpkg_shell`,
      },
      "Yarn Packages": {
        "@orta/yarn-builder": `yarnpkg_builder`,
        "@orta/yarn-cli": `yarnpkg_cli`,
      },
      "Default Plugins": {
        "@orta/yarn-plugin-compat": `plugin_compat`,
        "@orta/yarn-plugin-dlx": `plugin_dlx`,
        "@orta/yarn-plugin-essentials": `plugin_essentials`,
        "@orta/yarn-plugin-file": `plugin_file`,
        "@orta/yarn-plugin-git": `plugin_git`,
        "@orta/yarn-plugin-github": `plugin_github`,
        "@orta/yarn-plugin-http": `plugin_http`,
        "@orta/yarn-plugin-init": `plugin_init`,
        "@orta/yarn-plugin-link": `plugin_link`,
        "@orta/yarn-plugin-node-modules": `plugin_node_modules`,
        "@orta/yarn-plugin-npm": `plugin_npm`,
        "@orta/yarn-plugin-npm-cli": `plugin_npm_cli`,
        "@orta/yarn-plugin-pack": `plugin_pack`,
        "@orta/yarn-plugin-patch": `plugin_patch`,
        "@orta/yarn-plugin-pnp": `plugin_pnp`,
      },
      "Contrib Plugins": {
        "@orta/yarn-plugin-constraints": `plugin_constraints`,
        "@orta/yarn-plugin-exec": `plugin_exec`,
        "@orta/yarn-plugin-interactive-tools": `plugin_interactive_tools`,
        "@orta/yarn-plugin-stage": `plugin_stage`,
        "@orta/yarn-plugin-typescript": `plugin_typescript`,
        "@orta/yarn-plugin-version": `plugin_version`,
        "@orta/yarn-plugin-workspace-tools": `plugin_workspace_tools`,
      },
    },
  ],
  source: [
    {
      path: `https://github.com/yarnpkg/berry/tree/master/`,
      line: `L`,
    },
  ],
};
