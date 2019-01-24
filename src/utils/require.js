import axios
  from 'axios'
import QS from 'qs'
import {
  Message,
  Loading
} from 'element-ui'
// import store from '@/store'

axios.defaults.withCredentials = true
let loading = ''
// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  // config.headers['token'] = tool.session.get('token')
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  loading = Loading.service({
    background: 'rgba(0,0,0,0)'
  })
  config.data = QS.stringify(config.data)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    setTimeout((e) => {
      loading.close() // 关闭loading
    }, 200)
    return Promise.resolve(response)
  },
  error => {
    loading.close()
    console.log('err' + error)// for debug
    Message({
      message: '网络异常,请稍后再试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
