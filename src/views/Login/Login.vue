<template>
  <login-header>
    <el-form slot="container" ref="ruleForm" :model="ruleForm" size="medium" :rules="rules" @submit.native.prevent>
      <div class="title">
        <h3>账号密码登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username"
          auto-complete="off" placeholder="账号" prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          type="password"
          v-model="ruleForm.pwd"
          auto-complete="off"
          placeholder="密码"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="handleSubmit"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLogin" type="primary" style="width:100%" @click="handleSubmit">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
        <el-button type="text" class="forget" @click="$router.push('/password')">忘记密码？</el-button>
      </el-form-item>
    </el-form>
  </login-header>
</template>

<script>
import LoginHeader from './LoginHeader'
export default {
  name:'',
  components: {LoginHeader},
  data () {
    return {
      isLogin: false,
      ruleForm: {
        username: "",
        pwd: "",
        autoLogin: true
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      const _this = this
      _this.$refs.ruleForm.validate(valid => {
        if (valid) {
          _this.isLogin = true
          _this.$store.dispatch('Login', _this.ruleForm).then(res => {
            // 存储到vuex中
            _this.$store.dispatch('setUser', res.token)
            _this.isLogin = false
            _this.$router.replace("/home")
          }).catch(error => {
            _this.isLogin = false
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  height: 50px;
  color: #505458;
  text-align: center;
}
.forget{
  float: right;
}
</style>