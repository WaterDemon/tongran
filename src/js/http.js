import axios from 'axios';
import vant from 'vant';
import router from '@/router'
var qs = require('qs');

axios.defaults.timeout = ''; // 自己定义超时时间
axios.defaults.baseURL = 'http://111.229.51.194/app';  // 地址，也你自己定

//http request 拦截器
axios.interceptors.request.use(
  config => {
    var headera = 'text/plain';
    var token = localStorage.getItem("token");
    if(token){
      // config.headers = {} 这样设置，是覆盖
      config.headers['access_token'] = token; // 这样设置，是添加 
     }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器  根据你实际业务情况调整状态码和要做的事情
axios.interceptors.response.use(
  response => {
    if (response.data.code == 0) {

      if (response.data.msg != 'SUCCESS') {
        //Toast.fail({ duration: 2500, message: response.data.msg, type: 'text' })
      }
    }
    else if (response.data.code == 401) {
      /*Toast.fail({duration: 2500,message: response.data.msg,type: 'text'})*/

      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })

      return;
    } else if (response.data.code == 1) {
      var message = response.data.msg;
      //Toast.fail({ duration: 2500, message: message, type: 'text' })
      return;
    } else if (response.data.code == 1001) {
      return response;
    }
    return response;
  },
)

// //返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) => {
//   //对响应数据做些事
//   if (res.data.code != 'SUCCESS') {
//     ElementUI.Message({
//       message: res.data.msg,
//       type: 'error'
//     });
//     return Promise.reject(res);
//   }
//   return res;
// }, (error) => {
//   if (error.response.status == 500) {
//     router.push({
//       path: '/neterror',
//       query: { redirect: router.currentRoute.fullPath }
//     })
//     return
//   }
//   return Promise.reject(error);
// });


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, type) {
  return new Promise((resolve, reject) => {

    axios({
      method: "post",
      url: url,
      type: type,
      data: qs.stringify(data),
    })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}




