/* global jest, describe */
jest.autoMockOff()
const defineTest = require('jscodeshift/src/testUtils').defineTest
const defineInlineTest = require('jscodeshift/src/testUtils').defineInlineTest
const transform = require('../lib/generator2async')

defineTest(__dirname, 'lib/generator2async')

describe('function expression', () => {
  defineInlineTest(transform, {}, `
const foo = {
  * foo () {
    yield 'bar'
  }
}
`, `
const foo = {
  async foo () {
    await 'bar'
  }
}
`);
defineInlineTest(transform, {}, `
const foo = {
  * foo () {
    function call1 () {};
    function call2 () {};
    yield [
      call1(),
      call2(),
    ]
  }
}
`, `
const foo = {
  async foo () {
    function call1 () {};
    function call2 () {};
    await Promise.all([call1(), call2()])
  }
}
`)
})
