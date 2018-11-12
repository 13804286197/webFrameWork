<template>
  <el-row :gutter="100">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><span v-model="lb" style="font-weight:bold;font-style:italic;">{{lb}}</span></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><input type="text"  v-model="currentValue" @change="handleChange"></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><span v-model="msg"  style="color: red;">{{msg}}</span></el-col>
  </el-row>
</template>

<script>
  export default {
    props:['label','value','format'],
    name: "MyInput",
    data(){
      return {
        msg:this.msg,
        lb:this.label+":",
        currentValue:this.value
      }
    },
    watch:{
      currentValue: function (newval,oldval) { //currentValue值变动就向父组件传值
        this.validate(newval);
      },
    },
    methods:{

      validate:function (val) {
        if(this.format=='int'){

          if(!this.isNumber(val)){
             this.msg = '输入类型不正确';
          }else {

            this.msg = '';
          }
        }
      },
      handleChange: function (event) {  //对值进行验证
        var val = event.target.value.trim();
        this.validate(val);
      },
      isNumber: function (value) {
        return (/^\-?[0-9]+$/).test(value + '');
      }
    }
  }
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
