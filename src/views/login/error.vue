<template>
  <div>
    <h5>登录失败！ -msg- {{ msg }}</h5>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     msg: this.$route.query.data
  //   };
  // }, //使用这种方式也可以显示 msg
  data() {
    return {
      msg: null
    };
  },
  created() {
    this.msg = this.$route.query.msg;
  }
};
</script>
