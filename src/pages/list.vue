<template>
  <div style="width: 100%; vertical-align: middle;display: table-cell">
    <div>
     <h2>书籍列表页面</h2>
    </div>
    <div>
      <router-link to="/">index</router-link>
    </div>
    <div style="text-align: center;vertical-align: middle;display: table-cell">
      <item-v v-for="n in 10" keys='index'></item-v>
    </div>
  </div>
</template>

<style>
  body {
    background-color: #ffffff;
  }
</style>

<script>
</script>
