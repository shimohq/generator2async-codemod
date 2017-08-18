const standard = require('standard')

module.exports = function (fileInfo, api) {
  const { jscodeshift: j } = api
  const root = j(fileInfo.source)

  root
    .find(j.FunctionDeclaration)
    .forEach(path => {
      const { id, params, body, generator, comments } = path.value
      if (generator) {
        const f = j.functionDeclaration(id, params, body)
        f.async = true
        f.comments = comments
        j(path).replaceWith(f)
      }
    })

  root
    .find(j.FunctionExpression)
    .forEach(path => {
      const { id, params, body, generator, comments } = path.value
      if (generator) {
        const f = j.functionExpression(id, params, body)
        f.async = true
        f.comments = comments
        j(path).replaceWith(f)
      }
    })

  root
    .find(j.YieldExpression)
    .forEach(path => {
      const { argument, comments } = path.value
      if (argument && argument.type === 'ConditionalExpression') {
        const { test, consequent, alternate } = argument
        const stmt = j.conditionalExpression(test,
          j.awaitExpression(consequent),
          j.awaitExpression(alternate))
        j(path).replaceWith(stmt)
      } else {
        const awaitExp = j.awaitExpression(argument)
        awaitExp.comments = comments
        j(path).replaceWith(awaitExp)
      }
    })

  root
    .find(j.ReturnStatement)
    .forEach(path => {
      const { argument, comments } = path.value
      if (argument && argument.type === 'AwaitExpression') {
        const stmt = j.returnStatement(argument.argument)
        stmt.comments = comments
        j(path).replaceWith(stmt)
      }
      if (argument && argument.type === 'ConditionalExpression') {
        const { test, consequent, alternate } = argument
        const stmt = j.returnStatement(j.conditionalExpression(test,
          consequent.type === 'AwaitExpression' ? consequent.argument : consequent,
          alternate.type === 'AwaitExpression' ? alternate.argument : alternate))
        j(path).replaceWith(stmt)
      }
    })

  const source = root.toSource()
  const { results: [{ output }] } = standard.lintTextSync(source, { fix: true })
  return output
}
