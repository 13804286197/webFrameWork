<template>
  <div>
<el-dialog  :title="permGroupId" :visible.sync="managerDialogFormVisible" @close="closeDialog" :showClose="false">
  <el-transfer v-model="value1"
               style="text-align: left; display: inline-block"
               :data="data"></el-transfer>

  <div slot="footer" class="dialog-footer">
    <el-button @click="sendMessage">取 消</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
  export default {
    props:['managerDialogFormVisible','permGroupId'],
    data() {


      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data: generateData2(),
        value1: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      }
    },
    watch: {
      managerDialogFormVisible: function(value) {
        console.log(value);
      },
      permGroupId: function(value,oldValue) {
        console.log(value+":"+oldValue);
      }
    },
    methods:{
      sendMessage(){
        this.$emit("closeForm","close");
      },
      closeDialog(){
        this.$emit("closeForm","close");
      }
    }
  }
</script>


