import {Configuration, Project} from '@orta/yarn-core';
import {PortablePath}           from '@orta/yarn-fslib';

import {WorkspaceRequiredError} from './WorkspaceRequiredError';

export async function openWorkspace(configuration: Configuration, cwd: PortablePath) {
  const {project, workspace} = await Project.find(configuration, cwd);

  if (!workspace)
    throw new WorkspaceRequiredError(project.cwd, cwd);

  return workspace;
}
