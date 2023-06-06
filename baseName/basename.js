const path = require('path')
let fileName = 'a/b/c/index.html'
console.log(path.basename(fileName,'.html'));
console.log(path.extname(fileName));
