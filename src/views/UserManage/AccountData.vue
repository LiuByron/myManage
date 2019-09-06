<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 15:06:49
 * @LastEditTime: 2019-08-30 10:44:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="account-container">
    <el-button size="small" type="primary" @click="isDialog = true">新增账户</el-button>
    <el-table class="table" border size="small" :data="tableData" style="width: 100%">
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-select @change="editSelectChange(scope.row)" v-if="scope.row.editor" size="small" v-model="scope.row.role" placeholder="请选择角色" style="width:85%">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="客服" value="客服"></el-option>
            <el-option label="游客" value="游客"></el-option>
          </el-select>
          <span v-else style="margin-left: 10px">{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editor" size="small" v-model="scope.row.username" placeholder="请输入账号" style="width:85%"></el-input>
          <span v-else style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.username !== 'admin'">
          <div v-if="scope.row.editor">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">完成</el-button>
            <el-button size="mini" @click="scope.row.editor = false">取消</el-button>
          </div>
          <div v-else>
            <el-button size="mini"  @click="scope.row.editor = true">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增账户" width="420px" :visible.sync="isDialog" :show-close="false">
      <el-form :model="accountForm" ref="accountForm" :rules="rules" size="small" label-width="100px">
        <el-form-item label="请选择角色" prop="role">
          <el-select @change="addSelectChange" v-model="accountForm.role" placeholder="请选择角色" style="width:85%">
            <el-option v-for="(item, index) in roleData" :label="item.role" :value="item.role" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入账号" prop="username">
          <el-input v-model="accountForm.username" placeholder="请输入账号" style="width:85%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="closeAdd('accountForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="addAccount('accountForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, addUser, deleteUser, editUser } from '@/api/account';
export default {
  name:'',
  data () {
    return {
      isDialog: false,
      tableData: [],
      accountForm: {
        username: '',
        role:'',
        key: '',
        des: ''
      },
      rules: {
        role: [{required: true, message: '请选择角色', trigger: 'change'}],
        username: [{required: true, message: '请输入账号', trigger: 'blur'}]
      },
      roleData: [
        {
          key: 'admin',
          role: '管理员',
          des: 'Super Administrator'
        },
        {
          key: 'editor',
          role: '客服',
          des: 'Normal Editor'
        },
        {
          key: 'visitor',
          role: '游客',
          des: 'Just a visitor'
        }
      ]
    }
  },
  created(){
    this.getAllUser()
  },
  methods: {
    getAllUser() {
      getAllUser().then(res => {
        res.datas.forEach(item => {
          item.editor = false
        })
        this.tableData = res.datas
      })
    },
    addAccount(formName) {
      const _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          addUser(_this.accountForm).then(res => {
            _this.$message.success(res.msg)
            _this.getAllUser()
            _this.isDialog = false;
            _this.$refs[formName].resetFields();
          })
        }
      })
    },
    handleDelete(index, row) {
      const _this = this
      _this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row).then(res => {
          _this.$message({
            type: 'success',
            message: res.msg
          })
          _this.getAllUser()
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleEdit(index, row) {
      row.editor = false
      editUser(row).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.getAllUser()
      })
    },
    closeAdd(formName) {
      this.isDialog = false;
      this.$refs[formName].resetFields();
    },
    addSelectChange(val) {
      this.roleData.forEach(item => {
        if (item.role === val) {
          this.accountForm.key = item.key
          this.accountForm.des = item.des
        }
      })
    },
    editSelectChange(item) {
      this.roleData.forEach(data => {
        if (data.role === item.role) {
          item.key = data.key
          item.des = data.des
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.account-container{
  padding: 10px;
  .table{
    margin-top: 10px;
  }
}
</style>