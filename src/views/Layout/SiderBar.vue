<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 09:47:11
 * @LastEditTime: 2019-08-29 09:55:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-scrollbar class="el-scrollbar">
    <el-menu :collapse="isCollapse" class="el-menu-slide" :default-active="$router.currentRoute.path" router>
      <template v-for="item in $store.state.routers" v-if="item.hidden&&item.children&&item.children.length>0">
        <!-- 单个菜单的容器 -->
        <el-menu-item v-if="item.children.length === 1" :index="item.children[0].path" :key="item.name">
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个子元素菜单的容器 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    isCollapse:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar{
  height: 100%;
  background: #fff;
  .el-menu-slide{
    border-right: none;
    i{
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>