import { makeBacktrace, makeNotice } from '../../../src/core/util';
import { getSourceFile } from '../../../src/server/util';

// this is in a separate file, because we are actually testing the line number of the code
describe('makeBacktrace', function () {
  it('returns a parsed stacktrace in Honeybadger format', function notAnonymous() {
    const error = new Error('this is an error from tests')
    const notice = makeNotice(error)
    return makeBacktrace(notice.stack, 0, getSourceFile)
      .then(backtrace => {
        expect(backtrace[0]).toEqual({
          file: __filename,
          method: 'Object.notAnonymous',
          number: 7,
          column: 19,
          source: {
            "5": "describe('makeBacktrace', function () {",
            "6": "  it('returns a parsed stacktrace in Honeybadger format', function notAnonymous() {",
            "7": "    const error = new Error('this is an error from tests')",
            "8": "    const notice = makeNotice(error)",
            "9": "    return makeBacktrace(notice.stack, 0, getSourceFile)"
          }
        })
      })

  })

  it('returns and empty array when no stack is undefined', function () {
    return makeBacktrace(undefined, 0, getSourceFile)
      .then(backtrace => {
        expect(backtrace).toEqual([])
      })
  })
})