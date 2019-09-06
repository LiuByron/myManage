<template>
  <div class="login-header">
    <div class="login-header-content">
      <div class="hint-show">
        <div class="title">
          <img src="@/assets/images/logo.png" alt="LOGO">
          <span>后端模板</span>
        </div>
        <div class="details">
          <span>后台管理模板测试，后台管理模板测试，后台管理模板测试，后台管理模板测试。</span>
        </div>
      </div>
      <div class="container">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-header{
  width: 100%;
  height: 100%;
  background: url('../../assets/images/4.jpg') no-repeat top center;
  background-size: cover; 
  .login-header-content{
    position: absolute;
    top: 25%;
    right: 15%;
    width: 400px;
    height: 500px;
    .hint-show{
      height: 160px;
      .title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 15px;
        color: rgba(0, 0, 0, 0.85);
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
        img {
          width: 80px;
          height: 80px;
          margin-right: 15px;
        }
      }
      .details{
        word-wrap: wrap;
        text-indent: 32px;
        color: rgba(0, 0, 0, .45);
      }
    }
    .container{
      background: #fff;
      border-radius: 5px;
      padding: 35px 35px 15px 35px;
      background-clip: padding-box;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
  }
}
</style>