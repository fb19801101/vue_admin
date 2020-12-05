<template>
  <div>
    <h5>登录成功！ -msg- {{ msg }}</h5>
    <h6>{{ data }}</h6>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: this.$route.query.msg,
      data: this.$route.query.data
    };
  }
  //   data() { //这种方式也可以
  //     return {
  //       msg: null
  //     };
  //   },
  // created() {
  //   this.msg = this.$route.query.data;
  // }
};
</script>
