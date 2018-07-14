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
  let bait = {}

  bait.command = 'init <name>'
  bait.desc = 'initializes a new Abode environment by creating a Abodefile'
  bait.builder = {}
  bait.handler = function (argv) {
    const {
      name
    } = argv
    const {
      shell,
      readdir,
      readdirSync,
      generator,
      path,
    } = dep;

    const resourcepath = path.resourcepath('/*');
    const initpath = path.templatepath('init');
    const dataJson = path.resourcepath('Abode.json');
    const destpath = path.cwdpath(name);

    console.log(resourcepath);
    console.log(destpath);

    shell.mkdir('-p', destpath);
    shell.cp('-f', resourcepath, destpath);

    // const templates = readdirSync(srcTemplate);

    // templates.forEach(template => {
    //   // shell.cp(template)
    //   // Mustache.parse(join(srcTemplate, template))
    //   // const content = Mustache.render(join(srcTemplate, template), {author:{name: "Sopar", email:"sopar"}})
    //   // console.log(content)
    //   // console.log(mustache + " " + datayaml + " " + normalize(srcTemplate, template) + " > " + normalize(dst, template))
    //   // shell.exec(mustache + " " + datayaml + " " + normalize(srcTemplate, template) + " > " + normalize(dst, template), {
    //   //   silent: true
    //   // }).stdout
    //   console.log(join(srcTemplate, template));
    //   console.log(datayaml);
    //   console.log(join(dst, template));
    //   generator.generate(datayaml, join(srcTemplate, template), join(dst, template));
    // });

    // for (var i in templates) {
    //   console.log(join(srcTemplate, templates[i]));
    //   console.log(datayaml);
    //   console.log(join(dst, templates[i]));
    //   generator.generate(datayaml, join(srcTemplate, templates[i]), join(dst, templates[i]));
    // }


    // shell.cp('-Rf', srcTemplate, dst)
    // shell.cp('Abode')
  }

  return bait;
}
