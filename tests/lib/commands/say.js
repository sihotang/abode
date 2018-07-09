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

describe('command/say.js', function () {
    describe('.handler', function () {
        // Mocks
        let _latestLogMessage
        const log = {
            debug: function (msg) {
                _latestLogMessage = msg
            }
        }

        // Target
        const _module = require('../../../lib/commands/say')
        let _target

        before(function () {
            _latestLogMessage = null
            _target = _module({
                log
            })
        })
        it('should print prefix and name', function () {
            _target.handler({
                prefix: 'Hello',
                name: 'CLI'
            })
            _latestLogMessage.should.equal('Hello CLI')
        })
        it('should print prefix, name and surname', function () {
            _target.handler({
                prefix: 'Hello',
                name: 'CLI',
                surname: 'ILC'
            })
            _latestLogMessage.should.equal('Hello CLI ILC')
        })
    })
});
