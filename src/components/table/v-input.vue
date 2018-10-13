<template>
  <div style="text-align: center;margin-top: 20px;">
    <span v-model="lb">{{lb}}</span>
    <input type="text"  v-model="currentValue" @change="handleChange">
  </div>
</template>

<script>
  export default {
    props:['label','max','min','value'],
    name: "MyInput",
    data(){
      return {
        lb:this.label,
        currentValue:this.value
      }
    },
    watch:{
      currentValue: function (newval,oldval) { //currentValue值变动就向父组件传值
      },
    },
    methods:{
      handleChange: function (event) {  //对值进行验证

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
