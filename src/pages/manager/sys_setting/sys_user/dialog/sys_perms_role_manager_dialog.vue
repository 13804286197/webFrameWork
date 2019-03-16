<template>
  <div >
    <el-dialog  :title="title" :visible.sync="managerDialogFormVisible" :close-on-click-modal="false" customClass="dialog"  :showClose="false" :center="true">

      <div style="text-align: center;width: 100%;height: 400px;overflow: auto">

        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          ref="tree"
          default-expand-all="true"
          :default-checked-keys="checkedKeys"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendMessage">取 消</el-button>
        <el-button @click="savePerms">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style>
  .dialog{
    width: 400px;
    height: 600px;
  }
</style>
<script>
  export default {
    props:['managerDialogFormVisible','permRoleId'],
    data() {

      return {
        defaultProps: {
          children: 'children',
          label: 'label'
          //label: 'label'
        },
        checkedKeys:[],
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
        var urls = this.$refs.tree.getCheckedKeys();
        var nurls = urls.filter(d=>d);
        params.append('permsRoleUrls',nurls );
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
        that.checkedKeys = [];
        that.data = [];
        var params = new URLSearchParams();
        params.append('permsRoleId', permsRoleId);
        var url = '/sys_perms_role_manager/list';
        this.$validater.loadingPost(that, url, params, null, function (result) {


          debugger
          that.title = result.sys_perms_roleModel.role_name+"权限管理";



          var data = [];
          for(var key in result.allPermsGroupModels) {

            var children = [];
            var values = result.allPermsGroupModels[key];

            values.forEach((perm, index) => {
              children.push({
                label: perm.uname,
                id: perm.url,
              });
            });
            data.push({
              label:key,
              id: null,
              children:children
            });
          }
          var checkedKeys = [];

          result.rolePermsGroupUrls.forEach((perm, index) => {
            checkedKeys.push(perm);
          });
          that.checkedKeys =checkedKeys;
          that.data = data;
        }, null);
      }
    }
  }
</script>


