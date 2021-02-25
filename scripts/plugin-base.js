const {existsSync} = require(`fs`);

module.exports = name => {
  if (existsSync(`${__dirname}/../packages/plugin-${name}/bundles/@orta/yarn-plugin-${name}.js`)) {
    return require(`${__dirname}/../packages/plugin-${name}/bundles/@orta/yarn-plugin-${name}.js`);
  } else {
    return require(`${__dirname}/../packages/plugin-${name}/bin/@orta/yarn-plugin-${name}.js`);
  }
};
