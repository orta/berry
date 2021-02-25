import {httpUtils}         from '@orta/yarn-core';
import {get}               from '@orta/yarn-plugin-npm/sources/npmHttpUtils';

import {makeConfiguration} from './_makeConfiguration';

jest.mock(`@orta/yarn-core`, () => ({
  ...jest.requireActual(`@orta/yarn-core`),
  httpUtils: {
    ...jest.requireActual(`@orta/yarn-core`).httpUtils,
    get: jest.fn(() => Promise.resolve()),
  },
}));

describe(`npmHttpUtils.get`, () => {
  for (const registry of [`https://example.org`, `https://example.org/`, `https://example.org/foo`, `https://example.org/foo/`]) {
    for (const path of [`/bar`]) {
      const expected = registry.replace(/\/+$/, ``) + path;

      it(`should craft the final path correctly (${registry} + ${path} = ${expected})`, async () => {
        const configuration = await makeConfiguration();

        await get(path, {
          configuration,
          registry,
        });

        expect(httpUtils.get).toHaveBeenCalledWith(expected, expect.anything());
      });
    }
  }
});
