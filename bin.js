const fs = require('fs/promises')
const path = require('path')
const ls = require('./index')

const workdir = process.cwd()
const argv = require('minimist')(process.argv.slice(2))

async function run() {
    let [input, output] = argv['_'][0]
    if (!input) return
    const stat = await fs.stat(input)
    if (stat.isDirectory()) {
        const {
            e: excludes = [],
            p: print
        } = argv
        const result = await ls(input, excludes)
        
        if (print) {
            console.log(JSON.stringify(result, null, 2))
            return
        }

        const dirname = path.parse(input).name
        output = output
            ? path.join(workdir, output) 
            : path.join(workdir, `${dirname}.json`)
        fs.writeFile(output, JSON.stringify(result))
    }
}
run()