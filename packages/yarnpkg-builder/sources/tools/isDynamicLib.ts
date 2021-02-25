import {getDynamicLibs} from '@orta/yarn-cli';

export const isDynamicLib = (request: string) => {
  if (getDynamicLibs().has(request))
    return true;

  if (request.match(/^@orta\/plugin-/))
    return true;

  return false;
};
