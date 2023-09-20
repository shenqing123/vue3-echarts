import axios from "axios";
const request =  axios.create({
    baseURL: 'http://project.x-zd.net:3001/apis',
    timeout: 5000
})
// 拦截器
request.interceptors.response.use(res=>{
    return res.data
}, err=>{
    return Promise.reject(err)
})
export default request