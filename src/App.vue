<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">用户</router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <router-link to="/coupon">优惠券</router-link>
      </el-menu-item>

    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: {
    activeIndex: 1
  }
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }

  a {
    text-decoration: none;
  }

  .box-card {
    margin: 30px 20px;
  }

</style>
