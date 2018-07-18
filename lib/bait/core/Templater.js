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

const { isAbsolute } = require('path');
const { createReadStream } = require('fs');
const Mustache = require('mustache');

const { streamToString } = require('../util');
const { templatepath } = require('../path');

module.exports = class Templater {
  /**
   * Initialize
   * @param {*} template
   * @param {*} data
   * @param {*} partials
   */
  constructor(template, data = {}, partials = []) {
    // console.log(template);
    this.template = this.readTemplate(template);
    if (data) this.data = (typeof data === 'string') ? this.readData(data) : data;
    else this.data = this.readData(template);
  }

  // static async render(...args) {
  //   this.renderWith(this.render, args);
  // }

  // static async renderString(...args) {
  //   this.renderWith(this.renderString, args);
  // }

  // static async renderWith(callback, template, data = {}) {
  //   const render = new Templater(template, data);
  //   callback(render);
  // }

  render() {
    return Mustache.render(this.template, this.data);
  }

  parseData(data) {
    try {
      return JSON.parse(data);
    } catch (ex) {
      console.error(
        'Shooot, could not parse data as JSON.\n' +
        'Tips: functions are not valid JSON and keys / values must be surround with double quotes.\n\n' +
        ex.stack);

      process.exit(1);
    }
  }

  readData(data) {
    data = isAbsolute(data) ? data : templatepath(data);
    streamToString(createReadStream(data), function onDone (str) {
      return this.parseData(str);
    });
  }

  readTemplate(template) {
    // console.log(template);
    template = isAbsolute(template) ? template : templatepath(template);
    return streamToString(createReadStream(template));
  }
}
