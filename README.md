# fs-tree-json

Convert directory tree to json.

## How to use

### Install

```sh
npm i @orez/fs-tree-json -g
```

or

```sh
npm i @orez/fs-tree-json
```

### Usage

#### 1. Shell

```sh
treejson d:/a a.json
```

```
D:\a
|   1.txt
|   2.txt
|   
\---b
        x.txt
        y.txt
```

`a.json`

```json
{
    "path": "d:/a",
    "name": "a",
    "children": [
        {
            "path": "d:\\a\\1.txt",
            "name": "1.txt"
        },
        {
            "path": "d:\\a\\2.txt",
            "name": "2.txt"
        },
        {
            "path": "d:\\a\\b",
            "name": "b",
            "children": [
                {
                    "path": "d:\\a\\b\\x.txt",
                    "name": "x.txt"
                },
                {
                    "path": "d:\\a\\b\\y.txt",
                    "name": "y.txt"
                }
            ]
        }
    ]
}
```

#### 2. API

```js
const treeJson = require('@orez/fs-tree-json')
const json = treeJson('d:/a')
```

