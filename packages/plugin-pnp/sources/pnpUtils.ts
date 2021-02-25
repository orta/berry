import {Locator, structUtils, Configuration} from '@orta/yarn-core';
import {ppath}                               from '@orta/yarn-fslib';

export function getUnpluggedPath(locator: Locator, {configuration}: {configuration: Configuration}) {
  return ppath.resolve(configuration.get(`pnpUnpluggedFolder`), structUtils.slugifyLocator(locator));
}
