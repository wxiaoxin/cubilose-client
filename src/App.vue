<template>
  <div id="app">
    <el-menu mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">用户</router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <router-link to="/coupon">优惠券</router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <router-link to="/delivery">发货</router-link>
      </el-menu-item>

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
