<template>
  <el-menu
    :default-active="index"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <el-menu-item style="width: 30%" index="0"></el-menu-item>
    <el-menu-item index="1" >系统设置</el-menu-item>
    <el-menu-item index="2">基础信息</el-menu-item>
    <el-menu-item index="3" >消息中心</el-menu-item>
    <el-menu-item index="4" >订单管理</el-menu-item>
  </el-menu>
</template>

<style>
    body {
        background-color: #ff0000;
    }
</style>

<script>
  export default {
    props:['index'],
    data() {
      return {
      }
    },
    methods:{
      goTo:function (url) {

        this.$router.push(url);
      }
    }
  }
</script>
