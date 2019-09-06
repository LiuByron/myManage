<template>
  <div class="layout-header">
    <div class="header-left">
      <img src="@/assets/images/logo.png" alt="LOGO">
      <span>贵阳信息技术研究院</span>
    </div>
    <div class="header-right">
      <div class="head-opration">
        <el-tooltip v-if="user.key !== 'visitor'" effect="dark" content="锁屏" placement="bottom">
          <i @click="lockScreen" class="el-icon-lock"></i>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <i @click="fullScreen" class="el-icon-full-screen"></i>
        </el-tooltip>
      </div>
      <el-dropdown class="system-user" @command="userCommand">
        <span class="userinfo-inner">
          <span>{{user.username}}</span>
          <img :src="require('@/assets/images/' + user.key +'.png')" alt="头像">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="设置锁屏密码" :visible.sync="isLock" width="30%" append-to-body :lock-scroll="false">
      <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" @submit.native.prevent>
        <el-form-item label="锁屏密码" prop="passwd">
          <el-input type="password" v-model="ruleForm.passwd" placeholder="请输入锁屏密码" @keyup.enter.native="handleSetLock"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleSetLock">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import screenfull from 'screenfull';
import { removeToken } from '@/utils/cookie';
import { validatenull } from '@/utils/validate';
export default {
  name:'',
  data() {
    return {
      isLock: false,
      ruleForm: {
        passwd: ''
      },
      rules: {
        passwd: [
          {required: true, message: '锁屏密码不能为空', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  computed:{
    ...mapGetters(['user', 'lockPasswd'])
  },
  methods: {
    userCommand(command) {
      if (command === 'logout') {
        removeToken()
        this.$router.replace('/login')
        location.reload()
      }

      if (command === 'usercenter') {
        this.$router.push('/userInfo')
      }
    },
    fullScreen() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    handleSetLock(e) {
      e.preventDefault();
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$store.commit('SET_LOCK_PASSWD', this.ruleForm.passwd)
          this.lockScreen()
        }
      })
    },
    lockScreen() {
      if (validatenull(this.lockPasswd)) {
        this.isLock = true
        return
      }
      this.$store.commit('SET_LOCK')
      setTimeout(() => {
        this.$router.push({ path: '/lock' })
      }, 100)
    }
  }
}

</script>
<style lang="scss" scoped>
.layout-header{
  width: 100%;
  height: 64px;
  line-height: 64px;
  background: #27acc4;
  .header-left{
    float: left;
    width: 49%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    img{
      width: 52px;
      margin: 0 15px;
    }
  }
  .header-right{
    float: right;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .head-opration{
      display: flex;
      flex-direction: row;
      color: #fff;
      font-size: 18px;
      i{
        cursor:pointer;
        margin-right: 15px;
      }
    }
    .system-user{
      height: 64px;
      .userinfo-inner{
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #fff;
        overflow: hidden;
        img{
          width: 52px;
          margin: 0 15px;
        }
      }
    }
  }
}
.layout-header::after{
  content:'';
  display:block;
  height:0;
  clear:both;
  visibility:hidden;
}
</style>