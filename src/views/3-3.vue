<template>
  <div class="home"></div>
</template>

<script>
/*
  拦截器：在请求或者响应被处理前拦截他们

  let instance = axios.create()
  请求拦截器 instance.interceptors.request.use(config=>return config,err=>return Promise.reject(err))
  响应拦截器 instance.interceptors.re.use(config=>return config,err=>return Promise.reject(err))
  取消拦截器 
*/
import axios from "axios";
import { Promise } from "q";
import { Toast } from "vant";
export default {
  name: "axios3-3",
  created() {
    let instance = axios.create({});
    //请求拦截器
    instance.interceptors.request.use(
      config => config,
      err => Promise.reject(err)
    );
    //响应拦截器
    instance.interceptors.response.use(res => res, err => Promise.reject(err));

    //取消拦截器（了解）
    let interceptors = axios.interceptors.request.use(config => {
      config.headers = {
        auth: true
      };
      return config;
    });
    axios.interceptors.request.eject(interceptors);

    //例子 登录状态（token:''） 不需要登录的接口
    let instance1 = axios.create({});
    instance1.interceptors.request.use(
      config => {
        config.headers.token = "";
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
    //需要登录的接口
    let instance2 = axios.create({});
    instance2.get("/data.json");

    //移动端开发的接口
    let instance3 = axios.create({});
    instance3.interceptors.request.use(config => {
      Toast.loading({
        mask: true,
        message: "加载中..."
      }); //loading 显示
      return config;
    });
    instance3.interceptors.response.use(
      res => {
        Toast.loading({
          mask: true,
          message: "加载中..."
        }); //loading 隐藏
        return res;
      },
      err => {
        Toast.loading({
          mask: true,
          message: "加载中..."
        }); //loading 隐藏
        return Promise.reject(err);
      }
    );
  }
};
</script>
