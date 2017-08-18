class Foo {
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
}

function * aGeneratorFunction () {
  yield this.pass()
  ;(yield this.pass()).another()
  this.another = {
    foo: yield this.pass(),
    pass: yield this.foo(),
    * bar () {
      return yield this.pass()
    }
  }
  const _ = yield* this.another.pass()
  return new Foo()
}
