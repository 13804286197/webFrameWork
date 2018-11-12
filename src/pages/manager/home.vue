<template>

  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">系统设置</el-menu-item>
    <el-menu-item index="2">基础信息</el-menu-item>
    <el-menu-item index="3" >消息中心</el-menu-item>
    <el-menu-item index="4" >订单管理</el-menu-item>
  </el-menu>

</template>

<style>


  .el-menu-demo{
    display:  block !important; width: 100% !important;

  }
    body {

      text-align: center;
        background-color: #ffffff;
    }
</style>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
