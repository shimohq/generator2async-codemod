#!/usr/bin/env node
'use strict'
const path = require('path')
const execa = require('execa')
const meow = require('meow')

const transformers = ['generator2async.js']

function executeTransformation (transformer, files, flags) {
  const spawnOptions = {
    stdio: 'inherit',
    stripEof: false
  }

  const args = ['-t', path.join(__dirname, 'lib', transformer)].concat(files)
  if (flags.dry) {
    args.push('--dry')
  }
  if (['babel', 'babylon', 'flow'].indexOf(flags.parser) >= 0) {
    args.push('--parser', flags.parser)
  }

  console.log(`Executing command: jscodeshift ${args.join(' ')}`)

  const result = execa.sync(require.resolve('.bin/jscodeshift'), args, spawnOptions)
  if (result.error) {
    throw result.error
  }
}

const cli = meow({
  description: 'Codemod to change test runner from generator function to async function',
  help: `
  Usage
    $ generator2async <path> [options]
  path             Files or directory to transform. Can be a glob like src/**.test.js
  Options
    --force, -f    Bypass Git safety checks and forcibly run codemods
    --dry, -d      Dry run (no changes are made to files)
    --parser       Parser to use for parsing your source files (babel | babylon | flow)  [babel]
  `}, {
    boolean: ['force', 'dry'],
    string: ['_'],
    alias: {
      f: 'force',
      h: 'help',
      d: 'dry'
    }
  }
)

const files = cli.input
if (files.length === 0) {
  cli.showHelp()
} else {
  transformers.forEach(t => executeTransformation(t, files, cli.flags))
}
