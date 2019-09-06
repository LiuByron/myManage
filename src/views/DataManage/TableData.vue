<template>
  <div>
    tabledata
  </div>
</template>

<script>
export default {
  name:'',
  data () {
    return {

    };
  },
  created(){
    console.log(this.$store.state.user.key);
  }
}

</script>
<style scoped>

</style>