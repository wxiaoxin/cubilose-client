<template>
  <div>
      <h1>ha</h1>
  </div>
</template>

<script>
  export default {
    name: 'delivery',
    data () {
      return {}
    },
    methods: {},
    created () {
      console.log(this.$route.params.id)
    }
  }
</script>
