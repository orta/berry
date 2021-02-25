const {createRequire, createRequireFromPath} = require(`module`);
const path = require(`path`);
const ts = require(`typescript`);

const tsconfigFile = ts.readJsonConfigFile(
  require.resolve(`@orta/yarn-monorepo/package.json`),
  ts.sys.readFile,
);

const compilerOptions = ts.parseJsonSourceFileConfigFileContent(
  tsconfigFile,
  ts.sys,
  path.dirname(tsconfigFile.fileName),
);

const compilerHost = ts.createCompilerHost(compilerOptions,);
const program = ts.createProgram(compilerOptions.fileNames, compilerOptions, compilerHost);
const moduleSpecifierResolutionHost = ts.createModuleSpecifierResolutionHost(program, compilerHost);
const rootSourceFile = program.getSourceFile(require.resolve(`@orta/yarn-core/sources/Project.ts`));

const TESTS = [
  [`@orta/yarn-core/sources/Configuration.ts`, `./Configuration`],
  [`@orta/yarn-fslib/README.md`, `@orta/yarn-fslib/README.md`],
  [`@orta/yarn-fslib/package.json`, `@orta/yarn-fslib/package`],
  [`@orta/yarn-fslib/sources/ZipFS.ts`, `@orta/yarn-fslib/sources/ZipFS`],
  [`@orta/yarn-fslib/sources/index.ts`, `@orta/yarn-fslib`],
];

const requireFactory = createRequire
  ? createRequire
  : createRequireFromPath;

for (const [test, expected] of TESTS) {
  const actual = ts.moduleSpecifiers.getModuleSpecifier(
    compilerOptions,
    rootSourceFile,
    rootSourceFile.fileName,
    requireFactory(rootSourceFile.fileName).resolve(test),
    moduleSpecifierResolutionHost,
  );

  if (actual === expected) {
    console.log(`\x1b[32m✓\x1b[0m ${actual}`);
  } else {
    console.log(`\x1b[31m✗\x1b[0m ${actual} !== ${expected}`);
    process.exitCode = 1;
  }
}
