import axios from 'axios'
import { Message } from 'element-ui'

// 创建图片保存的axios实例
const fileUpload = axios.create({
  baseURL: process.env.SAVE_IMG_API,
  timeout: 5000,
  headers: { 'Content-Type': 'multipart/form-data' }
})

// respone拦截器
fileUpload.interceptors.response.use(
  response => {
    const res = response.data
    if (res.res === '0') {
      Message({
        message: '上传失败，请重试！',
        type: 'warning',
        duration: 5 * 1000
      })
    }
    return res.result
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default fileUpload
