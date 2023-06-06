const path = require('path')
let fileStr = 'c/b/f/g/one.ts'
// 获取完整文件名
console.log(path.basename(fileStr));
// 获取文件名 第二个参数可以理解为去掉的部分
console.log(path.basename(fileStr,'.ts'));