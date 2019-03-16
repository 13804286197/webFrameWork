<template>
  <div>
    <el-dialog :title="title" :visible.sync="managerDialogFormVisible" :showClose="false" :center="true"
    >

      <div style="text-align: center">

        <el-transfer
          style="text-align: left; display: inline-block"
          filterable

          :filter-method="filterMethod"
          filter-placeholder="请输入关键字"
          :titles="['角色列表', '当前角色']"
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
    props: ['managerDialogFormVisible', 'permUserId'],
    data() {

      return {
        data: [],
        title: "",
        id: "",
        value: [],
        filterMethod(query, item) {
          return item.name.indexOf(query) > -1;
        }
      }
    },
    watch: {

      permUserId: function (value) {
        if (value != null && value != "") {
          this.id = value;
          this.handleRolesLoad(value);
        }
      }
    },
    methods: {
      sendMessage() {
        this.$emit("closeForm", "close");
      },
      savePerms() {

        var that = this;
        var params = new URLSearchParams();
        params.append('permsUserId', this.id);
        params.append('permsRoleIds', this.value.toString());
        var url = '/sys_perms_user_role_manager/save';
        this.$validater.loadingPost(this, url, params, null, null, '操作失败', function (result) {
          if (result != null && result != "") {
            that.$validater.showSuccessBottomRight(that, "保存成功");
            that.$emit("closeForm", result);
          } else {
            that.$emit("closeForm", "close");
          }
        });
      },

      handleRolesLoad(permsUserId) {


        var that = this;
        that.data = [];
        that.value = [];
        var params = new URLSearchParams();
        params.append('permsUserId', permsUserId);
        var url = '/sys_perms_user_role_manager/list';
        this.$validater.loadingPost(that, url, params, null, function (result) {


          that.title = result.sysUserModel.username + "角色管理";
          var data = [];
          result.allPermsRoleModels.forEach((module, index) => {
            data.push({
              label: module.role_name,
              key: module.id,
              name: module.role_name
            });
          });

          that.value = result.userRolesIds;
          that.data = data;
        }, null);
      }
    }
  }
</script>


