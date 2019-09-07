<template>
  <div class="home"></div>
</template>

<script>
/*
  错误处理: 请求错误时进行的处理
*/
import axios from "axios";
import { Promise } from "q";
import { Toast } from "vant";
export default {
  name: "axios3-4",
  created() {
    axios.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
    axios.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        return Promise.reject(err);
      }
    );
    axios
      .get("/data.json")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("err", err);
      });

    //例子: 在实际开发过程中，一般添加统一的错误处理
    let intance = axios.create({});
    intance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        //请求错误 一般http状态码以4开头，常见: 401超时，404 not found
        Toast.loading({
          mask: false,
          message: "加载中..."
        });
        return Promise.reject(err);
      }
    );
    intance.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        //请求错误 一般http状态码以5开头，常见: 500系统错误，502系统重启
        Toast.loading({
          mask: false,
          message: "加载中..."
        });
        return Promise.reject(err);
      }
    );
    intance
      .get("/data1.json")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
