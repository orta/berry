import {Plugin} from '@orta/yarn-core';

import focus    from './commands/focus';
import foreach  from './commands/foreach';

const plugin: Plugin = {
  commands: [
    focus,
    foreach,
  ],
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
