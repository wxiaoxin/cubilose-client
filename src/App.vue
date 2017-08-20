<template>
  <div id="app">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/" > 用户 </el-menu-item>
      <el-menu-item index="/coupon"> 优惠券 </el-menu-item>
      <el-menu-item index="/delivery"> 发货 </el-menu-item>
      <el-menu-item index="/test"> 测试 </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
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

  .box-card,
  .opt-panel {
    margin: 30px 20px;
  }

</style>
