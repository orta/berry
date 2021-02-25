// @ts-expect-error
import packageJson           from '@orta/yarn-cli/package.json';
import {PluginConfiguration} from '@orta/yarn-core';

import {getDynamicLibs}      from './getDynamicLibs';

export function getPluginConfiguration(): PluginConfiguration {
  const plugins = new Set<string>();
  for (const dependencyName of packageJson[`@orta/yarn-builder`].bundles.standard)
    plugins.add(dependencyName);

  const modules = getDynamicLibs();
  for (const plugin of plugins)
    modules.set(plugin, require(plugin).default);

  return {plugins, modules};
}
