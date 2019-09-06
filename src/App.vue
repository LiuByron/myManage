<template>
  <div id="app">
    <!-- scale-down-to-up -->
    <!-- rotate-flip-top -->
    <transition name="rotate-flip-top">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import 'vue-transition.css';
import { getToken } from '@/utils/cookie';
export default {
  created() {
    const isCookie = typeof(getToken()) !== "undefined" ? true : false;
    if (isCookie) {
      this.$store.dispatch('setUser', getToken())
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
