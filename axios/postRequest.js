const axios = require('axios')
const qs = require('qs')
// 使用x-www-form-urlencoded格式传递参数
axios.post('http://127.0.0.1/middleWare',qs.stringify({
    name:'huzhiyao',
    age:'25'
})).then(response=> {
    console.log(response.data)
})
.catch(error=> {
    console.log(error)
});
