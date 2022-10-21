const fs = require('fs/promises')
const path = require('path')

async function ls(dir) {
    const info = path.parse(dir)
    const result = {
        path: dir,
        name: info.base,
        children: []
    }

    const files = await fs.readdir(dir)
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

module.exports = ls
