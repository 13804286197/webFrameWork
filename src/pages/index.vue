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
    <router-link to="/login">登陆</router-link>


    <form>
      <v-input label="姓名" name="hello"  style="width: 100%;" format="int"></v-input>
    </form>

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

      }


    }

  }


</script>
