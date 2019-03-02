<template>
  <div>
<el-dialog  :title="title" :visible.sync="managerDialogFormVisible"  :showClose="false" :center="true"
>
  <div style="text-align: center">

  <el-transfer
    style="text-align: left; display: inline-block"
    filterable

    :filter-method="filterMethod"
    filter-placeholder="请输入关键字"
    :titles="['权限列表', '当前权限']"
    v-model="value1"
    :data="data"
    center="true"
  >
  </el-transfer>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="sendMessage">取 消</el-button>
    <el-button @click="savePerms">保存</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
  export default {
    props:['managerDialogFormVisible','permGroupId'],
    data() {

      return {
        data: [],
        title:"",
        value1: ["/sys_perms/list"],
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
      savePerms(){
        console.log(this.value1);
      },

      handlePermsLoad(permGroupId){

        var that = this;
        var params = new URLSearchParams();
        params.append('permsGroupId', permGroupId);
        var url = '/sys_perms_group_manager/list';
        this.$validater.loadingPost(that, url, params, null, function (result) {
          that.title = result.sysPermsGroupModel.name;
          var data = [];
          result.permissions.forEach((perm, index) => {
            data.push({
              label: perm.commont,
              key: perm.url,
              name: perm.commont
            });
          });

          debugger

          that.data = data;
        }, null);
      }
    }
  }
</script>


