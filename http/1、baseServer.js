// const http = require('http')
// let server = http.createServer()
// server.on('request',(request,response) => {
//     let {url,method} = request
//     // 注意：后面的那个是;
//     response.setHeader('Content-type','text/html;charset=utf-8')
//     let str = `你请求的地址是${url}, 请求的方式 ${method}`
//     response.end(str)
// })
// server.listen("80",() => {
//     console.log("已启动 https://127.0.0.1");
// })
const http = require('http')
const app = http.createServer()
app.on('request',(req,res) => {
    let url = req.url
    res.setHeader('Content-type',"text/html;charset=utf-8")
    res.end(`访问的地址为${url}`)
})
app.listen(80,() => {
    console.log("server is running on http://127.0.0.1");
})