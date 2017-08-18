class Foo {
  nonGenerator () {
    this.pass()
    if (this.pass()) {
      return
    }
    return 'foo'
  }

  * aGeneratorMethod () {
    yield this.pass()
    ;(yield this.pass()).another()
    this.another = {
      foo: yield this.pass(),
      * bar () {
        return yield this.pass()
      }
    }
    yield* this.another.pass()
    return new Foo()
  }

  async foo () {
    await this.pass()
    if (this.pass()) {
      return
    }
    return 'bar'
  }
}

/**
 * leading comment
 */
function * aGeneratorFunction () {
  yield this.pass() // inline comment
  ;(yield this.pass()).another()
  this.another = {
    foo: yield this.pass(),
    pass: yield this.foo(),
    * bar () {
      return yield this.pass()
    }
  }
  const _ = yield* /* comment */ this.another.pass()
  // comment
  return new Foo()
}

function nonGenerator () {
  this.pass()
}

async function foo () {
  this.pass()
}
