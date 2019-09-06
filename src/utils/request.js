import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/cookie';

// 创建axios实例
const service = axios.create({
  timeout: 10000
})
const isLogin = typeof(getToken()) !== "undefined" ? true : false;
// 请求拦截
service.interceptors.request.use(config => {
  if (isLogin) {
    config.headers.Authorization = getToken();
  }
  return config;
}, err => {
  Promise.reject(err)
})

// 响应拦截
service.interceptors.response.use(response => {
  return Promise.resolve(response.data);
},err => {
  let errMsg = '';
  if (err && err.response.status) {
    switch(err.response.status) {
      case 401:
        errMsg = "登录状态失效，请重新登录";
        removeToken();
        router.push("/login");
        break;
      case 403:
        errMsg = "拒绝访问。";
        break;
      case 408:
        errMsg = "请求超时";
        break;
      case 500:
        errMsg = "服务器内部错误";
        break;
      case 501:
        errMsg = "服务器未实现";
        break;
      case 502:
        errMsg = "网关错误";
        break;
      case 503:
        errMsg = "服务不可用";
        break;
      case 504:
        errMsg = "网关超时";
        break;
      case 505:
        errMsg = "HTTP版本不支持";
        break;
      default:
        errMsg = err.response.data.msg;
        break;
    }
  } else {
    errMsg = err;
  }

  Message({
    type: 'error',
    message: errMsg
  });
  return Promise.reject(err.response);
})

export default service;
