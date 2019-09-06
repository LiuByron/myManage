<template>
  <div class="home">
    <div class="home-body">
      <h4 class="title">欢迎来到测试后台管理系统</h4>
      <p class="des">
        关关雎鸠，在河之洲。
        窈窕淑女，君子好逑。

        参差荇菜，左右流之。
        窈窕淑女，寤寐求之。

        求之不得，寤寐思服。
        悠哉悠哉，辗转反侧。

        参差荇菜，左右采之。
        窈窕淑女，琴瑟友之。

        参差荇菜，左右芼之。
        窈窕淑女，钟鼓乐之。
      </p>
      <el-button @click="goLearn">进入学习</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  methods:{
    goLearn() {
      this.$message.info('没有进入的啦！')
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    background: url('../assets/images/0.jpg') no-repeat top center;
    background-size: cover;
    text-align: center;
    .home-body{
      height: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.6);
      .title{
        padding-top: 50px;
        font-size: 20px;
        font-weight: bold;
      }
      .des{
        text-indent: 25px;
        padding: 30px;
        margin: 40px 0;
        font-size: 18px;
      }
    }
  }
</style>
