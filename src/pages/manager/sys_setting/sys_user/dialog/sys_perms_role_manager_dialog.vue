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
          v-model="value"
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
    props:['managerDialogFormVisible','permRoleId'],
    data() {

      return {
        data: [],
        title:"",
        id:"",
        value: [],
        filterMethod(query, item) {
          return item.name.indexOf(query) > -1;
        }
      }
    },
    watch: {

      permRoleId: function(value) {
        if(value !=null&& value!=""){
          this.id = value;
          this.handlePermsLoad(value);
        }
      }
    },
    methods:{
      sendMessage(){
        this.$emit("closeForm","close");
      },
      savePerms(){

        var that = this;
        var params = new URLSearchParams();
        params.append('permsRoleId', this.id);
        params.append('permsModulesIds', this.value.toString());
        var url = '/sys_perms_role_manager/save';
        this.$validater.loadingPost(this, url, params, null,null,'操作失败' ,function (result){
          if(result!=null&&result!=""){
            that.$validater.showSuccessBottomRight(that, "保存成功");
            that.$emit("closeForm",result);
          }else {
            that.$emit("closeForm","close");
          }
        });
      },

      handlePermsLoad(permsRoleId){

        var that = this;
        var params = new URLSearchParams();
        params.append('permsRoleId', permsRoleId);
        var url = '/sys_perms_role_manager/list';
        this.$validater.loadingPost(that, url, params, null, function (result) {


          that.title = result.sys_perms_roleModel.role_name+"权限管理";
          var data = [];
          result.allPermsGroupModels.forEach((module, index) => {
            data.push({
              label: module.name,
              key: module.uid,
              name: module.name
            });
          });

          that.value = result.rolePermsGroupModels;
          that.data = data;
        }, null);
      }
    }
  }
</script>


