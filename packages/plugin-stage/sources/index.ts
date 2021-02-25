import {Plugin, Project} from '@orta/yarn-core';
import {PortablePath}    from '@orta/yarn-fslib';

import stage             from './commands/stage';

export interface Hooks {
  populateYarnPaths?: (
    project: Project,
    definePath: (path: PortablePath | null) => void,
  ) => Promise<void>,
}

const plugin: Plugin = {
  commands: [
    stage,
  ],
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
