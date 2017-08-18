class Foo {
  nonGenerator () {
    this.pass()
    if (this.pass()) {
      return
    }
    return 'foo'
  }

  async aGeneratorMethod () {
    await this.pass()
    ;(await this.pass()).another()
    const another = {
      foo: await this.pass(),
      async bar () {
        return this.pass()
      }
    }
    await this.another.pass()
    (this.pass() ? await this.pass() : await this.pass())
    return (this.foo ? another.foo() : this.foo())
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
async function aGeneratorFunction () {
  await this.pass() // inline comment
  ;(await this.pass()).another()
  this.another = {
    foo: await this.pass(),
    pass: await this.foo(),
    async bar () {
      return this.pass()
    }
  }
  const _ = await /* comment */ this.another.pass()
  // comment
  return new Foo()
}

function nonGenerator () {
  this.pass()
}

async function foo () {
  this.pass()
}
