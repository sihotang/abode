"use strict";

var _fs = require("fs");

var _lodash = require("lodash");

var _path = _interopRequireDefault(require("path"));

var _sync = require("../sync");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This content is released under The MIT License
 *
 * Copyright (c) 2018 Sopar Sihotang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @package       @sihotang/bait
 * @author        Sopar Sihotang <soparsihotang@gmail.com>
 * @copyright     2018 Sopar Sihotang
 * @license       http://www.opensource.org/licenses/MIT
 */
module.exports = (options = {}) => {
  const cli = _path.default.resolve(process.cwd(), 'node_modules/typescript/lib/tsc');

  const command = "node ".concat(cli, " --pretty");

  const libPath = _path.default.resolve(process.cwd(), 'lib');

  const srcPath = _path.default.resolve(process.cwd(), 'src');

  let args = options.isProduction ? " --inlineSources --sourceRoot ".concat(_path.default.relative(libPath, srcPath)) : '';

  const run = function () {
    function run(workspace = '', cwd = process.cwd()) {
      const project = _path.default.resolve(cwd, "".concat(workspace, "/tsconfig.json"));

      args = (0, _fs.existsSync)(project) ? "".concat(args, " -p ").concat(_path.default.dirname(project)) : args;
      (0, _sync.execSync)("".concat(command, " -outDir lib -t es5 -m commonjs ").concat(args));

      if (options.isProduction) {
        (0, _sync.execSync)("".concat(command, " -outDir lib-amd -t es5 -m amd ").concat(args));
        (0, _sync.execSync)("".concat(command, " -outDir lib-es2015 -t es5 -m es2015 ").concat(args));
      }
    }

    return run;
  }();

  let workspaces = [];
  let promise = Promise.resolve();
  const pkgWorkspaces = options.workspaces;
  workspaces = pkgWorkspaces;
  workspaces.forEach(workspace => {
    promise = promise.then(() => run((0, _lodash.trimEnd)(workspace, '/*')));
  });
  return undefined;
};