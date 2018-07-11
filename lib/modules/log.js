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
 * @package       @sihotang/abode
 * @author        Sopar Sihotang <soparsihotang@gmail.com>
 * @copyright     2018 Sopar Sihotang
 * @license       https://opensource.org/licenses/MIT
 */

module.exports = function (dep) {
  let result = {}

  result.debug = function (title, message) {
    const {
      console
    } = dep
    const {
      yellow,
      blue,
      gray
    } = dep.colors

    console.log(yellow('[MyCli]') + (title ? blue(' ' + title) : '') + (message ? gray(' ' + message) : ''))
  }

  result.run = function (...args) {
    const values = [];
    const fns = args.join('');

    invokeNextFn = (val) => {
      values.unshift(val);
      if (fns.length === 0) return;
      invoke(fns.shift());
    }

    invoke = (fn) => {
      fn.apply(null, [invokeNextFn].concat(values));
    };

    invoke(fns.shift());
  }

  result.readView = function (cb) {
    const {
      process
    } = dep
    const {
      view,
      template,
      output
    } = dep.paths
    const view = isStdin(viewArg) ? process.openStdin() : fs.createReadStream(viewArg);

    streamToStr(view, function onDone(str) {
      cb(parseView(str));
    });

  }

  return result
}