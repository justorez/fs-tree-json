#!/usr/bin/env node

const fs = require('fs/promises')
const path = require('path')
const ls = require('../index')

const workdir = process.cwd()
const argv = require('minimist')(process.argv.slice(2))

async function run() {
    let input = argv['_'][0]
    let output = argv['_'][1]
    if (!input) return
    const stat = await fs.stat(input)
    if (stat.isDirectory()) {
        const result = await ls(input)
        const dirname = path.parse(input).name
        output = output
            ? path.join(workdir, output) 
            : path.join(workdir, `${dirname}.json`)
        fs.writeFile(output, JSON.stringify(result))
    }
}
run()