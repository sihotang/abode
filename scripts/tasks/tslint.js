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
  const mstslint = require.resolve('tslint-microsoft-contrib');

  const cli = _path.default.resolve(process.cwd(), 'node_modules/tslint/lib/tslint-cli');

  const command = "node ".concat(cli);

  let rules = _path.default.dirname(mstslint);

  if (options.rulesDir) {
    rules = options.rulesDir;
  }

  const run = function () {
    function run(workspace = '', cwd = process.cwd()) {
      const project = _path.default.resolve(cwd, "".concat(workspace, "/tsconfig.json"));

      const config = _path.default.resolve(cwd, "".concat(workspace, "/tslint.json"));

      const source = _path.default.resolve(cwd, "".concat(workspace, "/**/*.ts*"));

      let args = (0, _lodash.compact)(['-t', 'stylish', "'".concat(source, "'")]);

      if ((0, _fs.existsSync)(project)) {
        args = (0, _lodash.pull)(args, "'".concat(source, "'"));
        args = (0, _lodash.concat)(args, '--project', "".concat(project));
      }

      args = (0, _lodash.concat)(args, '-r', "".concat(rules));

      if ((0, _fs.existsSync)(config)) {
        args = (0, _lodash.pull)(args, '-r', "".concat(rules));
        args = (0, _lodash.concat)(args, '-c', "".concat(config));
      }

      (0, _sync.execSync)("".concat(command, " ").concat((0, _lodash.join)(args, ' ')));
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