import {UsageError} from 'clipanion';

export function findPlugins({basedir, profile, plugins}: {basedir: string, profile: string, plugins: Array<string>}) {
  const pkgJson = require(`${basedir}/package.json`);

  if (!pkgJson[`@orta/yarn-builder`] || !pkgJson[`@orta/yarn-builder`].bundles)
    throw new UsageError(`This command requires your package.json to contain specific configuration keys`);

  if (!profile)
    profile = `standard`;

  const profiles = profile.split(/\+/g);
  const supported = new Set(Object.keys(pkgJson[`@orta/yarn-builder`].bundles));

  if (profiles.some(profile => !supported.has(profile)))
    throw new UsageError(`Invalid profile "${profile}", expected one of ${[...supported].join(`, `)}`);

  return Array.from(new Set(profiles.reduce((acc, profile) => {
    return acc.concat(pkgJson[`@orta/yarn-builder`].bundles[profile]);
  }, plugins)));
}
