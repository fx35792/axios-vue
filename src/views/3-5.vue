<template>
  <div class="home"></div>
</template>

<script>
/*
  取消请求: 用于取消正在进行的http请求（了解）
*/
import axios from "axios";

export default {
  name: "axios3-5",
  created() {
    let source = axios.CancelToken.source();
    axios
      .get("/data.json", {
        cancelToken: source.token
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    //取消请求操作(message 可选)
    source.cancel("cancel http");

    //什么情况下可能用到取消请求
    //在执行大量导出数据、或者查询数据的时候，请求时间过长3-5秒，这个过程我们可以进行取消请求的操作
  }
};
</script>
