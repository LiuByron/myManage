<template>
  <div style="text-align:center">
    <h1 class="title">4 0 4</h1>
    <p class="des">哦哦~~，你访问的页面不存在哟！你可以尝试</p>
    <a class="link" @click="$router.go(-1)">返回上一页！</a>
  </div>
</template>

<style lang="scss" scoped>
.title{
  margin-top: 30px;
  font-size: 150px;
  color: gold;
}
.des{
  font-size: 18px;
  margin: 30px 0;
}
.link{
  color: yellowgreen;
  cursor:pointer;
}
</style>