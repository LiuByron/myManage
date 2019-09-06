<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 09:46:00
 * @LastEditTime: 2019-08-28 10:09:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="layout">
    <layout-header></layout-header>
    <layout-content @menuToggle="menuToggle">
      <sider-bar :isCollapse="isCollapse" slot="left" />
      <router-view slot="content" />
    </layout-content>
  </div>
</template>

<script>
import SiderBar from './SiderBar'
import LayoutHeader from './LayoutHeader'
import LayoutContent from './LayoutContent'
export default {
  name:'',
  data() {
    return {
      isCollapse: false
    }
  },
  components: {LayoutHeader, LayoutContent, SiderBar},
  methods: {
    menuToggle() {
      this.isCollapse = !this.isCollapse
    }
  }
}

</script>
<style lang="scss" scoped>
.layout{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9; 
}
</style>