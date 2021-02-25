import './polyfills';

import {YarnVersion}            from '@orta/yarn-core';

import {main}                   from './main';
import {getPluginConfiguration} from './tools/getPluginConfiguration';

main({
  binaryVersion: YarnVersion || `<unknown>`,
  pluginConfiguration: getPluginConfiguration(),
});
