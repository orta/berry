import {Plugin, SettingsType}      from '@orta/yarn-core';
import {NodeModulesHoistingLimits} from '@orta/yarn-pnpify';

import {NodeModulesLinker}         from './NodeModulesLinker';
import {PnpLooseLinker}            from './PnpLooseLinker';

declare module '@orta/yarn-core' {
  interface ConfigurationValueMap {
    nmHoistingLimits: NodeModulesHoistingLimits;
  }
}

const plugin: Plugin = {
  configuration: {
    nmHoistingLimits: {
      description: `Prevent packages can be hoisted past specific levels`,
      type: SettingsType.STRING,
      values: [
        NodeModulesHoistingLimits.WORKSPACES,
        NodeModulesHoistingLimits.DEPENDENCIES,
        NodeModulesHoistingLimits.NONE,
      ],
      default: `none`,
    },
  },
  linkers: [
    NodeModulesLinker,
    PnpLooseLinker,
  ],
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
