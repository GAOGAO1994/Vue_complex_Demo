<template>
  <div>
    <div style="{width: 100%; height: 50px; z-index: -1}"></div>
    <nav-bar title="商品评论"></nav-bar>
    <comment :cid="$route.params.id"></comment>
  </div>
</template>

<script>
    export default {
        name: "GoodsComment"
    }
</script>

<style scoped>

</style>
