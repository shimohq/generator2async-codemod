const standard = require('standard')

module.exports = function (fileInfo, api) {
  const { jscodeshift: j } = api
  const root = j(fileInfo.source)

  root
    .find(j.FunctionDeclaration)
    .forEach(path => {
      const { id, params, body, generator } = path.value
      if (generator) {
        const f = j.functionDeclaration(id, params, body)
        f.async = true
        j(path).replaceWith(f)
      }
    })

  root
    .find(j.FunctionExpression)
    .forEach(path => {
      const { id, params, body, generator } = path.value
      if (generator) {
        const f = j.functionExpression(id, params, body)
        f.async = true
        j(path).replaceWith(f)
      }
    })

  root
    .find(j.YieldExpression)
    .forEach(path => {
      const { argument } = path.value
      const awaitExp = j.awaitExpression(argument)
      j(path).replaceWith(awaitExp)
    })

  const source = root.toSource()
  const { results: [{ output }] } = standard.lintTextSync(source, { fix: true })
  return output
}
