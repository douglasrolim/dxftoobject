# dxftojson

convert dxf file into json object (forked https://github.com/team-codecraft/dxftojson)

## Getting started

forked from: https://github.com/team-codecraft/dxftojson

install package 

```javascript
const dxf = require('dxftoobject');

const fr = new FileReader()
fr.readAsBinaryString(file)
fr.onloadend = function (e) {
    dxf(e.target.result).then(response => {
        console.log(response)
    })
}

```

