/**
 * This content is released under The MIT License (MIT)
 *
 * Copyright (c) 2018 Sopar Sihotang.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
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
 * @license       https://opensource.org/licenses/MIT
 */

const {
  basename,
  isAbsolute,
  join,
  resolve
} = require('path');
const {
  createReadStream,
  readdir,
  readdirSync,
  writeFileSync
} = require('fs');
const Mustache = require('mustache');
const camelCase = require('camelcase');
const requireDir = require('require-dir');
const colors = require('chalk');
const shell = require('shelljs');

// External dependencies to pass to the commands
let dep = {
  basename,
  isAbsolute,
  join,
  resolve,
  createReadStream,
  readdir,
  readdirSync,
  writeFileSync,
  console,
  colors,
  shell,
  process,
  Mustache
}

// Internal dependencies
let inDepFns = requireDir(join(__dirname, 'bait'));
const resolveInternalDependencies = (src, dst) => {
  Object.keys(inDepFns).forEach(name => {
    if (typeof src[name] === 'function') dep[camelCase(name)] = inDepFns[name](dep);
    else {
      dst[camelCase(name)] = {};
      resolveInternalDependencies(src[name], dst[camelCase(name)]);
    }
  });
}

resolveInternalDependencies(inDepFns, dep);

// inDepFns = requireDir(join(__dirname, 'bait', 'core'));
// resolveInternalDependencies(inDepFns, dep);

// Load commands from folder and pass dependencies
const commandsFn = requireDir(join(__dirname, 'commands'));
const commands = Object.keys(commandsFn).map((i) => commandsFn[i](dep));

// Export commands and modules separatelly
module.exports = {
  commands,
  bait: dep,
  core: dep.core
}
