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

module.exports = function (dep) {
  let viewArg;
  let templateArg;
  let outputArg;
  let partials;
  let partialObjs = {};

  const template = function (name) {
    return {
      name: name,
      view: readView(name),
      template: readTemplate(name),
      partial: readPartials(name)
    }
  }

  const templates = function () {
    return;
  }

  const generate = function (view, template, output, partials = []) {
    const { Mustache } = dep;

    viewArg = view;
    templateArg = template;
    outputArg = output;
    partials = partials;

    Mustache.clearCache();

    run(readView, readTemplate, render, toStdout);
  }

  const run = function (/*args*/) {
    const fns = Array.prototype.slice.call(arguments);
    let values = [];

    const invokeNextFn = (val) => {
      values.unshift(val);
      if (fns.length === 0) return;
      console.log(values);
      invoke(fns.shift());
    }

    const invoke = (fn) => {
      fn.apply(null, [invokeNextFn].concat(values));
    }

    invoke(fns.shift());
  }

  const render = function (cb, templateStr, jsonView) {
    const { Mustache } = dep;
    Mustache.parse(templateStr);
    cb(Mustache.render(templateStr, jsonView, partialObjs));
  }

  const parseView = function (str) {
    const { process } = dep;

    try {
      return JSON.parse(str);
    } catch (ex) {
      console.error(
        'Shooot, could not parse view as JSON.\n' +
        'Tips: functions are not valid JSON and keys / values must be surround with double quotes.\n\n' +
        ex.stack);

      process.exit(1);
    }
  }

  const readView = function (cb) {
    const { createReadStream, process } = dep;
    // console.log(viewArg);
    // console.log(isStdin(viewArg));
    const view = isStdin(viewArg) ? process.openStdin() : createReadStream(viewArg);
    // console.log(view);

    streamToStr(view, function onDone(str) {
      cb(parseView(str));
    });
  }

  const readPartials = function (cb) {
    if (!partials.length) return cb();

    const { createReadStream } = dep;
    const partial = partials.pop();
    const partialObj = createReadStream(partialPath);

    streamToStr(partialObj, function onDone(str) {
      partialObjs[getPartialName(partial)] = str;
      readPartials(cb);
    });
  }

  const readTemplate = function (cb) {
    const { createReadStream } = dep;
    const template = createReadStream(templateArg);
    streamToStr(template, cb);
  }

  const toStdout = function (cb, str) {
    const { writeFileSync, process } = dep;

    if (outputArg) {
      cb(writeFileSync(outputArg, str));
    } else {
      cb(process.stdout.write(str));
    }
  }

  const streamToStr = function (stream, cb) {
    const { process } = dep;
    let data = '';

    stream.on('data', function onData(chunk) {
      data += chunk;
    }).once('end', function onEnd() {
      cb(data.toString());
    }).on('error', function onError(err) {
      if (wasNotFound(err)) {
        console.error('Could not find file:', err.path);
      } else {
        console.error('Error while reading file:', err.message);
      }
      process.exit(1);
    });
  }

  const isStdin = function (view) {
    return view === '-';
  }

  const wasNotFound = function (err) {
    return err.code && err.code === 'ENOENT';
  }

  const getPartialName = function (filename) {
    const { basename } = dep;
    return basename(filename, '.abdt');
  }

  return { generate };
}
