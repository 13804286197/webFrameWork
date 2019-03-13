<template>
  <div >
    <el-dialog  :title="title" :visible.sync="managerDialogFormVisible" :close-on-click-modal="false" customClass="dialog"  :showClose="false" :center="true">

      <div style="text-align: center;width: 100%;height: 400px;overflow: auto">

        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
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
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1'
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        },{
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        },{
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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


