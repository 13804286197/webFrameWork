<template>
  <div>
    <div>
      {{msg}}
    </div>
    <div>
      <router-link to="/list">list</router-link>
    </div>
    <button @click="setInfo()">存放数据</button>

    <button @click="getInfo()">获取数据</button>

    <router-link to="/table">table</router-link>

    <v-input label="姓名" max="20" min="10" value="3" style="width: 100%;" ></v-input>

  </div>
</template>

<style>
  body {
    background-color: #ffffff;
  }
</style>

<script>
  export default {
    data() {
      return {msg: '这个是index模板页'}
    },

    methods: {
      setInfo: function () {
        var params = new URLSearchParams();
        params.append('username','wangliang');
        params.append('password','wangliang')
        this.$axios.post(
          '/common/login',params)
        .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      goTo:function (url) {
        this.$router.push(url);

      },
      getInfo: function () {

        var router = this.$router;
        var params = new URLSearchParams();
        params.append('username','wangliang');
        params.append('password','wangliang')
        this.$axios.post(
          '/common/info',params)
          .then(function (response) {
            console.log(response.data);
            router.push('/list')
          })
          .catch(function (error) {
            console.log(error);
          });
      }


    }

  }


</script>
