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

require('chai').should()

describe('modules/log.js', function () {
    describe('.debug', function () {
        // Mocks
        let _latestConsolePrint
        const colors = {
            yellow: (m) => m,
            blue: (m) => m,
            gray: (m) => m
        }
        const console = {
            log: function () {
                _latestConsolePrint = arguments
            }
        }

        // Target
        const _module = require('../../../lib/modules/log')
        let _target

        before(function () {
            _latestConsolePrint = null
            _target = _module({
                colors,
                console
            })
        })
        it('should print without title and description', function () {
            _target.debug('')
            _latestConsolePrint[0].should.equal('[MyCli]')
        })
        it('should print title', function () {
            _target.debug('Title')
            _latestConsolePrint[0].should.equal('[MyCli] Title')
        })
        it('should print title and description', function () {
            _target.debug('Title', 'Description')
            _latestConsolePrint[0].should.equal('[MyCli] Title Description')
        })
    })
});
