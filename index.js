const fs = require('fs/promises')
const path = require('path')

let excludes = []

async function ls(dir) {
    const info = path.parse(dir)
    const result = {
        path: dir,
        name: info.base,
        children: []
    }

    let files = await fs.readdir(dir)
    if (excludes && excludes.length) {
        files = files.filter(
            (file) => !excludes.some((str) => file.includes(str))
        )
    }

    for (const file of files) {
        const target = path.join(dir, file)
        const stat = await fs.stat(target)
        if (stat.isFile()) {
            result.children.push({
                path: target,
                name: file
            })
        } else {
            result.children.push(await ls(target))
        }
    }

    return result
}

module.exports = (dir, ex) => (excludes = ex) && ls(dir)
