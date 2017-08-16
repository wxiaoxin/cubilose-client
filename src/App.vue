<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1">用户</el-menu-item>
      <el-menu-item index="2">优惠券</el-menu-item>
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
</style>
