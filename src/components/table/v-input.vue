<template>
  <div style="text-align: center;margin-top: 20px;">
    <span v-model="lb">{{lb}}</span>
    <input type="text"  v-model="currentValue" @change="handleChange">
    <span v-model="msg">{{msg}}</span>
  </div>
</template>

<script>
  export default {
    props:['label','value','format'],
    name: "MyInput",
    data(){
      return {
        msg:this.msg,
        lb:this.label,
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

<style scoped>
  input{
    width: 280px;
    height: 36px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button{
    border: none;
    background: #4e83e4;
    color: #fff;
    height: 36px;
    width: 36px;
  }
</style>
