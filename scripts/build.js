"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _array = require("lodash/array");

var _utils = require("./utils");

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
function build(additionalTasks = []) {
  const buildStartTime = new Date().getTime();
  const pkg = _utils.packaged;
  if (!pkg) return;
  let tasks = ['tslint', 'tscompile'];
  let workspaces = [];
  let isFail = false;
  let promise = Promise.resolve();
  tasks = (0, _array.concat)(tasks, additionalTasks);

  if (pkg.disabledTasks) {
    tasks = tasks.filter(task => pkg.disabledTasks.indexOf(task) < 0);
  }

  if (process.argv.length >= 4 && process.argv[3].indexOf('--') === -1) {
    tasks = [process.argv[3]];
  }

  const pkgWorkspaces = pkg.workspaces;
  workspaces = typeof pkgWorkspaces !== 'undefined' ? pkgWorkspaces : (0, _array.compact)(['.']);

  const run = function () {
    function run(task) {
      const startTime = new Date().getTime();
      return Promise.resolve().then(() => !isFail && Promise.resolve().then(() => _utils.Logger.startTask(pkg.name, task)).then(() => require("./tasks/".concat(task))({
        isProduction: _utils.isProduction,
        workspaces,
        argv: process.argv
      })).then(() => _utils.Logger.endTask(pkg.name, task, startTime)).catch(e => {
        isFail = true;

        _utils.Logger.endTask(pkg.name, task, startTime, e);
      }));
    }

    return run;
  }();

  tasks.forEach(task => {
    promise = promise.then(() => run(task));
  });
  promise.then(() => {
    if (isFail) {
      process.exitCode = 1;
    }

    _utils.Logger.endBuild(pkg.name, !isFail, buildStartTime);
  });
}