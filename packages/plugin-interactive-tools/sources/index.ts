import {Plugin}           from '@orta/yarn-core';

import search             from './commands/search';
import upgradeInteractive from './commands/upgrade-interactive';

const plugin: Plugin = {
  commands: [
    search,
    upgradeInteractive,
  ],
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
