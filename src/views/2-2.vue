<template>
  <div class="home"></div>
</template>

<script>
/*
  axios请求方法：get、post、put、patch、delete

  get:获取数据
  post:提交数据（表单提交/文件上传）
  put:更新数据 （将所有的数据推送到后端）
  patch:更新数据 （只将修改的数据推送到后端）
  delete:删除数据

  具体的提交方式是由后端来定义的
 */
import axios from "axios";

export default {
  name: "axios-2",
  created() {
    //http://localhost:8080/data.json?id=1&name=%E5%BC%A0%E4%B8%89
    //get请求第一种方式
    axios
      .get("/data.json", {
        params: {
          id: 1,
          name: "张三"
        }
      })
      .then(res => {
        console.log(res);
      });
    //get请求第二种方式
    axios({
      method: "get",
      url: "/data.json",
      timeout: 1000,
      params: {
        id: 1,
        name: "张三"
      }
    }).then(res => {
      console.log(res);
    });

    //post 存在两种数据格式的提交
    //form-data 表单提交(图片上传、文件上传)
    //application/json

    //post请求第一种方式
    let data = {
      id: 1
    };
    axios.post("/post", data).then(() => {});
    //post请求第二种方式
    axios({
      method: "post",
      url: "/post",
      data: data
    }).then(() => {});

    //form-data的post请求方式
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    axios.post("/post", formData).then(() => {});

    //那么put、patch也有两种方式类似于get、post，下面的演示咱们就只采取一种方式
    axios.put("/put", data).then(() => {});
    axios.patch("/patch", data).then(() => {});

    //delete请求第一种方式
    axios
      .delete("/delete", {
        params: {
          id: 1
        }
      })
      .then(() => {});
    axios
      .delete("/delete", {
        data: {
          id: 1
        }
      })
      .then(() => {});
    //delete请求第二种方式
    axios({
      method: "delete",
      url: "/delete",
      // params:{id:1},
      data: {
        id: 1
      }
    });
  }
};
</script>
