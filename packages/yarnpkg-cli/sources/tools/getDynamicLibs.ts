import * as cli       from '@orta/yarn-cli';
import * as core      from '@orta/yarn-core';
import * as fslib     from '@orta/yarn-fslib';
import * as libzip    from '@orta/yarn-libzip';
import * as parsers   from '@orta/yarn-parsers';
import * as shell     from '@orta/yarn-shell';
import * as clipanion from 'clipanion';
import * as semver    from 'semver';
import * as typanion  from 'typanion';

export const getDynamicLibs = () => new Map<string, any>([
  [`@orta/yarn-cli`, cli],
  [`@orta/yarn-core`, core],
  [`@orta/yarn-fslib`, fslib],
  [`@orta/yarn-libzip`, libzip],
  [`@orta/yarn-parsers`, parsers],
  [`@orta/yarn-shell`, shell],

  // Those ones are always useful
  [`clipanion`, clipanion],
  [`semver`, semver],
  [`typanion`, typanion],
]);
