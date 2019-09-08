import axios from 'axios';
import service from './contactApi';
import { Toast } from 'vant';
Toast.allowMultiple();//多了Toast并存

//service 循环遍历出不同的请求方法

let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 5000
})

const Http = {}; //包裹请求方法的容器
let globalLoadingStatus; //默认情况请求接口会出现”正在加载...“,如果入参idLoading:false,则就不会出现”正在加载“
//请求格式/参数的统一
for (let key in service) {
  let api = service[key]; //method,url

  //async 避免进入回调地狱
  Http[key] = async function (
    params,//请求参数 get、delete（url）、post、put、patch（data)
    isFormData = false,//是否是form-data的请求
    config = {}, //配置参数
    idLoading = true,//默认正在加载显示
  ) {
    globalLoadingStatus = idLoading;
    let newParams = {};
    //判断 content-type 是否是form-data
    if (params && isFormData) {
      newParams = new FormData();
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }

    //不同请求的判断
    let response = {};
    if (api.method === 'post' || api.method === 'put' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'get' || api.method === 'delete') {
      config.params = newParams;
      try {
        response = await instance[api.method](api.url, config)
      } catch (err) {
        response = err
      }
    }
    return response
  }
}

//请求 拦截器
let toastLoading;
instance.interceptors.request.use(config => {
  globalLoadingStatus = config.params ? (config.params.isLoading ? true : false) : globalLoadingStatus
  //发起请求前
  if (globalLoadingStatus) {
    toastLoading = Toast.loading({
      mask: false,//遮罩层
      duration: 0,//一直存在
      forbidClick: true,//禁止点击
      message: '加载中...'
    })
  }
  return config;
}, err => {
  //请求错误
  toastLoading && toastLoading.clear();
  return Promise.reject(err)
})

//响应 拦截器
instance.interceptors.response.use(res => {
  //请求成功了
  toastLoading && toastLoading.clear();
  if (res.data && res.status === 200) {
    return res.data
  }
}, err => {
  //
  Toast('请求错误，请稍后重试');
  toastLoading && toastLoading.clear();
  return Promise.reject(err)
})

export default Http;