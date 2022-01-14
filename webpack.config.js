/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const entryPoint = './out/cli.js';
const outDir = path.join(__dirname, 'dist');
const outFile = 'humble';

const BuildHumblePlugin = {
  apply: (compiler) => {
    compiler.hooks.afterEmit.tap('BuildHumblePlugin', () => {
      // Getting the Humble bundle path, reading the bundle, and adding
      // a hashbang to the bundle with the path to the node interpreter.
      const bundlePath = path.join(outDir, outFile);
      const bundle = fs.readFileSync(bundlePath).toString();
      const hashbangBundle = `#!/usr/bin/env node\n${bundle}`;

      // Writing out the bundle with and without the hashbang.
      fs.writeFileSync(bundlePath, hashbangBundle);
      fs.writeFileSync(`${bundlePath}.js`, bundle);
    });
  },
};

module.exports = {
  entry: entryPoint,
  target: 'node',
  mode: 'development',
  externals: {
    canvas: '{}',
  },
  plugins: [
    BuildHumblePlugin,
  ],
  output: {
    path: outDir,
    filename: outFile,
  },
};
