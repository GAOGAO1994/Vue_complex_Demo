<template>
    <li>
      <slot></slot>
      <slot name="icon" ></slot>
    </li>
</template>

<script>
    export default {
        name: "my-li"
    }
</script>

<style scoped>

  li{
    list-style: none;
    float: left;
    width: 33.333%;
    text-align: center;
  }
  /*slot中的图片设置*/
  img{
    width: 100%;
  }
</style>
