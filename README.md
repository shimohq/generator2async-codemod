
# Migrating from generator function to async function
[![Travis](https://img.shields.io/travis/shimohq/generator2async-codemod.svg)](https://travis-ci.org/shimohq/generator2async-codemod) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A `jscodeshift` tranformer for migrating generator function to async function

## Usage

```
$ npm install --global generator2async-codemod
or
$ yarn global add generator2async-codemod

$ generator2async <path> [options]
	path	Files or directory to transform. Can be a glob like src/**.test.js
	Options
	  --force, -f    Bypass Git safety checks and forcibly run codemods
	  --dry, -d      Dry run (no changes are made to files)
```
