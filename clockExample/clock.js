const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, './clock.html'), 'utf-8', function (err, res) {
    if (err) {
        console.log("读取失败");
        return
    }
    let cssStr = res.match(/<style>([\s\S]*)<\/style>/)[1]
    let scriptStr = res.match(/<script>([\s\S]*)<\/script>/)[1]
    writeToFile(cssStr, './index.css')
    writeToFile(scriptStr, './index.js')
    let replaceStr = res.replace(/<style>[\s\S]*<\/style>/, '<link rel="stylesheet" href="./index.css">').replace(/<script>([\s\S]*)<\/script>/, '<script src="./index.js"></script>')
    fs.writeFile(path.join(__dirname, './clock.html'), replaceStr, 'utf-8', function (err) {
        if (err) {
            console.log('分离失败');
        } else {
            console.log('分离成功');
        }
    })
})

function writeToFile(data, route) {
    fs.writeFile(path.join(__dirname, route), data, 'utf-8', function (err) {
        if (err) {
            console.log('写入失败!');
        } else {
            console.log('写入成功!');
        }
    })
}