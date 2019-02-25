<template>
  <div>
<el-dialog  :title="permGroupId" :visible.sync="managerDialogFormVisible"  :showClose="false">

  <el-transfer
    style="text-align: left; display: inline-block"

    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入城市拼音"
    v-model="value1"
    :data="data">
  </el-transfer>
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

      return {
        data: "",
        value1: [],
        filterMethod(query, item) {
          return item.name.indexOf(query) > -1;
        }
      }
    },
    watch: {
      managerDialogFormVisible: function(value) {
        console.log(value);
      },
      permGroupId: function(value,oldValue) {
        if(value !=null&& value!=""){
          this.handlePermsLoad(value);
        }
      }
    },
    methods:{
      sendMessage(){
        this.$emit("closeForm","close");
      },
      handlePermsLoad(permGroupId){

        var that = this;
        var params = new URLSearchParams();
        params.append('permsGroupId', permGroupId);
        var url = '/sys_perms_group_manager/list';
        this.$validater.loadingPost(that, url, params, null, function (results) {

          var data = [];
          results.forEach((perm, index) => {
            data.push({
              label: perm.commont,
              key: index,
              name: perm.commont
            });
          });

          that.data = data;
        }, null);
      }
    }
  }
</script>


