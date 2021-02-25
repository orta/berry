import {Filename, FakeFS, PortablePath, ZipCompression, ZipFS, NodeFS, ppath, xfs, npath} from '@orta/yarn-fslib';
import {getLibzipPromise}                                                                 from '@orta/yarn-libzip';
import {PassThrough, Readable}                                                            from 'stream';
import tar                                                                                from 'tar';

import * as miscUtils                                                                     from './miscUtils';

interface MakeArchiveFromDirectoryOptions {
  baseFs?: FakeFS<PortablePath>,
  prefixPath?: PortablePath | null,
  compressionLevel?: ZipCompression,
  inMemory?: boolean,
}

export async function makeArchiveFromDirectory(source: PortablePath, {baseFs = new NodeFS(), prefixPath = PortablePath.root, compressionLevel, inMemory = false}: MakeArchiveFromDirectoryOptions = {}): Promise<ZipFS> {
  const libzip = await getLibzipPromise();

  let zipFs;
  if (inMemory) {
    zipFs = new ZipFS(null, {libzip, level: compressionLevel});
  } else {
    const tmpFolder = await xfs.mktempPromise();
    const tmpFile = ppath.join(tmpFolder, `archive.zip` as Filename);

    zipFs = new ZipFS(tmpFile, {create: true, libzip, level: compressionLevel});
  }

  const target = ppath.resolve(PortablePath.root, prefixPath!);
  await zipFs.copyPromise(target, source, {baseFs, stableTime: true, stableSort: true});

  return zipFs;
}

interface ExtractBufferOptions {
  compressionLevel?: ZipCompression,
  prefixPath?: PortablePath,
  stripComponents?: number,
}

export async function convertToZip(tgz: Buffer, opts: ExtractBufferOptions) {
  const tmpFolder = await xfs.mktempPromise();
  const tmpFile = ppath.join(tmpFolder, `archive.zip` as Filename);
  const {compressionLevel, ...bufferOpts} = opts;

  return await extractArchiveTo(tgz, new ZipFS(tmpFile, {create: true, libzip: await getLibzipPromise(), level: compressionLevel}), bufferOpts);
}

async function * parseTar(tgz: Buffer) {
  // @ts-expect-error - Types are wrong about what this function returns
  const parser: tar.ParseStream = new tar.Parse();

  const passthrough = new PassThrough({objectMode: true, autoDestroy: true, emitClose: true});

  parser.on(`entry`, (entry: tar.ReadEntry) => {
    passthrough.write(entry);
  });

  parser.on(`error`, error => {
    passthrough.destroy(error);
  });

  parser.on(`close`, () => {
    passthrough.destroy();
  });

  parser.end(tgz);

  for await (const entry of passthrough) {
    const it = entry as tar.ReadEntry;
    yield it;
    it.resume();
  }
}

export async function extractArchiveTo<T extends FakeFS<PortablePath>>(tgz: Buffer, targetFs: T, {stripComponents = 0, prefixPath = PortablePath.dot}: ExtractBufferOptions = {}): Promise<T> {
  // 1980-01-01, like Fedora
  const defaultTime = 315532800;

  function ignore(entry: tar.ReadEntry) {
    // Disallow absolute paths; might be malicious (ex: /etc/passwd)
    if (entry.path[0] === `/`)
      return true;

    const parts = entry.path.split(/\//g);

    // We also ignore paths that could lead to escaping outside the archive
    if (parts.some((part: string) => part === `..`))
      return true;

    if (parts.length <= stripComponents)
      return true;

    return false;
  }

  for await (const entry of parseTar(tgz)) {
    if (ignore(entry))
      continue;

    const parts = ppath.normalize(npath.toPortablePath(entry.path)).replace(/\/$/, ``).split(/\//g);
    if (parts.length <= stripComponents)
      continue;

    const slicePath = parts.slice(stripComponents).join(`/`) as PortablePath;
    const mappedPath = ppath.join(prefixPath, slicePath);

    let mode = 0o644;

    // If a single executable bit is set, normalize so that all are
    if (entry.type === `Directory` || ((entry.mode ?? 0) & 0o111) !== 0)
      mode |= 0o111;

    switch (entry.type) {
      case `Directory`: {
        targetFs.mkdirpSync(ppath.dirname(mappedPath), {chmod: 0o755, utimes: [defaultTime, defaultTime]});

        targetFs.mkdirSync(mappedPath);
        targetFs.chmodSync(mappedPath, mode);
        targetFs.utimesSync(mappedPath, defaultTime, defaultTime);
      } break;

      case `OldFile`:
      case `File`: {
        targetFs.mkdirpSync(ppath.dirname(mappedPath), {chmod: 0o755, utimes: [defaultTime, defaultTime]});

        targetFs.writeFileSync(mappedPath, await miscUtils.bufferStream(entry as unknown as Readable));
        targetFs.chmodSync(mappedPath, mode);
        targetFs.utimesSync(mappedPath, defaultTime, defaultTime);
      } break;

      case `SymbolicLink`: {
        targetFs.mkdirpSync(ppath.dirname(mappedPath), {chmod: 0o755, utimes: [defaultTime, defaultTime]});

        targetFs.symlinkSync((entry as any).linkpath, mappedPath);
        targetFs.lutimesSync?.(mappedPath, defaultTime, defaultTime);
      } break;
    }
  }

  return targetFs;
}
