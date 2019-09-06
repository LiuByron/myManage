<template>
  <login-header>
    <el-form slot="container" :model="ruleForm" :rules="rules" size="medium" ref="ruleForm">
      <div class="title">
        <h3>找回密码</h3>
      </div>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username"
          auto-complete="off" placeholder="账号" prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="ruleForm.email"
          auto-complete="off" placeholder="邮箱" prefix-icon="el-icon-message">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%" @click="handleSubmit" >确定</el-button>
      </el-form-item>
    </el-form>
  </login-header>
</template>

<script>
import LoginHeader from '@/views/Login/LoginHeader.vue'
export default {
  name:'',
  components: {LoginHeader},
  data () {
    return {
      loading: false,
      ruleForm: {
        username: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: "email", message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      const _this= this
      _this.$refs.ruleForm.validate(valid => {
        if (valid) {
          _this.isLogin = true
          _this.$axios.post("/api/users/findPwd", this.ruleForm).then(res => {
          _this.loading = false;
          _this.$message.success(res.data.msg);
          _this.$router.replace("/login")
        }).catch(() => {
          _this.loading = false;
        })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.title{
  height: 50px;
  color: #505458;
  text-align: center;
}
</style>