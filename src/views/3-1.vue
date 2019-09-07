<template>
  <div class="home"></div>
</template>

<script>
/*
  axios的实例
  为什么我们要使用axios的实例呢？
  因为在开发的过程中，我们可能会有不同的baseURL、timeout
*/
import axios from "axios";

export default {
  name: "axios3-1",
  created() {
    //axios的实例
    let axios1 = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 1000
    });
    let axios2 = axios.create({
      baseURL: "https://easy-mock.com/mock/5d5fb2ce9b58ad2249ff6c2b/mockapi",
      timeout: 5000
    });

    axios1.get("/data.json").then(res => {
      console.log(res);
    });
    axios2.get("/table/high/list").then(res => {
      console.log(res);
    });
  }
};
</script>
