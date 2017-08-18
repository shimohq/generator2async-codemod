class Foo {
  async aGeneratorMethod () {
    await this.pass()
    ;(await this.pass()).another()
    this.another = {
      foo: await this.pass(),
      async bar () {
        return await this.pass()
      }
    }
    await this.another.pass()
    return new Foo()
  }
}

async function aGeneratorFunction () {
  await this.pass()
  ;(await this.pass()).another()
  this.another = {
    foo: await this.pass(),
    pass: await this.foo(),
    async bar () {
      return await this.pass()
    }
  }
  const _ = await this.another.pass()
  return new Foo()
}
