<template>
    <el-form id="form" :rules="rules" ref="form" :model="loginform" label-width="80px">
      <el-form-item prop="username" label="账户：">
        <el-tooltip class="item"  content="长度在 8 到 20 个字符"  effect="light" placement="right-start">
        <el-input v-model="loginform.username" ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="password" label="密码：" >
        <el-tooltip class="item"  content="长度在 8 到 20 个字符"  effect="light" placement="right-start">
        <el-input v-model="loginform.password"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button type="reset">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<style>


    #form{
      margin-left: 500px;
      margin-top: 200px;
    }

    body {
      width: 100%;
      height: 100%;
      text-align: center;
      vertical-align: middle;
      margin:0px auto;
    }
</style>

<script>
  export default {


    data() {

      var emptyValidator = (rule, value, callback) => {

        if(!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          return callback() // 一些同学的问题可能就出在这里
        }
      };

      return {
        loginform: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, //是否必填
              trigger: 'blur', //何事件触发
              validator:emptyValidator
            },
            //可以设置双重验证标准
            { min: 8, max: 20,  message: '长度在 8 到 20 个字符', }
          ],
          password:[
            { required: true, //是否必填
              message: '密码不能为空', //规则
              trigger: 'blur'  //何事件触发
            },
            //可以设置双重验证标准
            { min: 8, max: 20,  message: '长度在 8 到 20 个字符', }
          ]

        }
      }
    },
    methods: {

      loginSuccess:function () {
        this.$message('这是一条消息提示');
      },
      login: function () {

        var that = this;
        var router = this.$router;
        var params = new URLSearchParams();
        params.append('username',this.loginform.username);
        params.append('password',this.loginform.password)
        this.$axios.post(
          '/common/login',params)
          .then(function (response) {
            that.$notify({
              title: '成功',
              message: '登陆成功',
              type: 'success',
              position: 'bottom-right'
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      onSubmit() {
        this.login();
      }
    }
  }
</script>
