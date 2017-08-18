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
`)
})
