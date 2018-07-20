"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _environment = require("./environment");

var _Timer = _interopRequireDefault(require("./Timer"));

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

/* eslint-disable no-console */
class Logger {
  static stats(args) {
    if (_environment.isProduction || _environment.isVerbose) {
      console.log(_chalk.default.gray(args));
    }
  }

  static startTask(name, task) {
    console.log("".concat(_Timer.default.prefixTime(name), " Starting: ").concat(_chalk.default.cyan(task)));
  }

  static endTask(name, task, startTime, errorMessage) {
    console.log("".concat(_Timer.default.prefixTime(name), "    ").concat(_Timer.default.passFail(errorMessage === undefined), ": ").concat(_chalk.default.cyan(task), " (").concat(_Timer.default.duration(startTime), ") ").concat(errorMessage ? _chalk.default.white(':') + _chalk.default.red(errorMessage) : ''));
  }

  static endBuild(name, passed, startTime) {
    console.log();
    console.log("".concat(_chalk.default.grey('============') + _chalk.default.white('[ ') + _chalk.default.cyan(name) + _chalk.default.white(' ]') + _chalk.default.grey('=') + _chalk.default.white('[ ') + _Timer.default.passFail(passed) + _chalk.default.white(' ]') + _chalk.default.grey('=') + _chalk.default.white('[ ') + _Timer.default.duration(startTime) + _chalk.default.white(' ]') + _chalk.default.grey('============')));
  }

}
/* eslint-enable no-console */


var _default = Logger;
exports.default = _default;