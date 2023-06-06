const axios = require('axios')
axios.get('http://127.0.0.1/api').then(response=> {
    console.log(response.data)
})
.catch(error=> {
    console.log(error)
});
