<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 09:46:45
 * @LastEditTime: 2019-08-28 10:09:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-container class="layout-content">
    <el-aside class="el-aside" :style="{width:muneWidth + 'px'}">
      <slot name="left"></slot>
    </el-aside>
    <el-main class="el-main">
      <div class="top">
        <i class="el-icon-s-unfold" @click="menuToggle"></i>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadCrumbItems" :key="index" :to="{ path: item.path }">
            {{item.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name:'',
  data () {
    return {
      muneWidth: 200,
      breadCrumbItems: []
    };
  },
  created() {
    this.initBreadCrumbItems(this.$route)
  },
  watch: {
    $route: function(to) {
      this.initBreadCrumbItems(to)
    }
  },
  methods: {
    initBreadCrumbItems(router) {
      let breadCrumbItems = [{path: "/", title: "后台管理系统"}]
      for(let i in router.matched) {
        if (router.matched[i].meta && router.matched[i].meta.title) {
          breadCrumbItems.push({
            path: router.matched[i].path ? router.matched[i].path : '/',
            title: router.matched[i].meta.title
          })
        }
      }
      this.breadCrumbItems = breadCrumbItems
    },
    menuToggle() {
      this.$emit("menuToggle")
      this.muneWidth === 64 ? this.muneWidth = 200 : this.muneWidth = 64
    }
  }
}

</script>
<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-aside {
    transition: width 0.5s;
    border-right:1px solid #e6e6e6;
  }
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 15px;
      }
      .breadcrumb {
        padding-left: 15px;
      }
    }
    .content {
      height: calc(100% - 55px);
      box-sizing: border-box;
    }
  }
}
</style>