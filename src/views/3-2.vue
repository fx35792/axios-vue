<template>
  <div class="home"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "axios3-2",
  created() {
    //第一部分：axios基本的配置参数有哪些
    axios.create({
      baseURL: "http://localhost:8080", //请求域名，基本地址
      timeout: 1000, //请求超时时长(ms)
      method: "get", //请求方式（post、put、patch、delete）
      url: "/data.json", //请求路径（接口）
      headers: {
        token: ""
      }, //请求头
      params: {}, //请求参数拼接在url中
      data: {} //请求参数放在请求体里面
    });
    
    //第二部分：axios三种参数配置方式以及优先级
    //1.aixos的全局配置(优先级：低)
    axios.defaults.timeout = 1000;
    axios.defaults.baseURL = "http://localhost:8080";
    //2.axios的实例配置(优先级：中)
    let instance = axios.create();
    instance.defaults.timeout = 3000;
    //3.axios的请求配置(优先级：高)
    instance.get("/data.json", {
      timeout: 5000
    });

    //第三部分：axios实例在实际开发中的应用
    //创建axios1实例
    let axios1 = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 1000
    });
    //创建axios2实例
    let axios2 = axios.create({
      baseURL: "https://easy-mock.com/mock/5d5fb2ce9b58ad2249ff6c2b/mockapi",
      timeout: 3000
    });

    //在axios1实例中设计的参数有：baseURL、timeout:1000、method、params
    axios1
      .get("/data.json", {
        params: {
          id: 1
        }
      })
      .then(res => {
        console.log(res);
      });
    //在axios1实例中设计的参数有：baseURL、timeout:5000、method、params
    axios2
      .get("/table/high/list", {
        timeout: 5000,
        params: {
          id: 1
        }
      })
      .then(res => {
        console.log(res);
      });
  }
};
</script>
