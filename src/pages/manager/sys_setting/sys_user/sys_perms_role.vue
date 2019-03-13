<template>
  <div>
    <el-container>

      <el-header>
        <el-form :model="queryForm" ref="addForm">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="角色Id" v-model="queryForm.roleId">
                  <template slot="prepend">角色Id</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="角色名称" v-model="queryForm.roleName">
                  <template slot="prepend">角色名称</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-search" @click="loadPermsRoles">搜索</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="addRole">添加角色</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>
      </el-header>

      <el-main>
        <div>
          <el-table
            :data="tableData" align="center" :border="true" cellpadding="0" cellspacing="0"
            style="vertical-align:center"
            width="100%">
            <el-table-column
              label="角色ID"
              width="400px" align="center">
              <template slot-scope="scope">
                <span style="text-align: center">{{ scope.row.role_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="角色名称"
              width="500px" align="center">
              <template slot-scope="scope" style="text-align: center">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.role_name }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope" style="text-align: center;margin: auto">
                <el-button
                  size="mini"
                  type="info"
                  @click="editRole(scope.$index, scope.row.id)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)">删除
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleManager(scope.$index, scope.row.id)">权限配置
                </el-button>
              </template>
            </el-table-column>

          </el-table>

        </div>
        <div style="margin-top: 100px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.totalCount">
          </el-pagination>
        </div>
      </el-main>

    </el-container>


    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="addForm" :rules="addPermsRoleRules" ref="addForm">
        <el-form-item  label="角色id" :label-width="formLabelWidth" prop="roleId">
          <el-tooltip class="item" content="长度在 5 到 20 个字符" effect="light" placement="right-start">
            <el-input v-model="addForm.roleId"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-tooltip class="item" content="长度在 3 到 20 个字符" effect="light" placement="right-start">
            <el-input v-model="addForm.roleName"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrEditPermsRole">确 定</el-button>
      </div>
    </el-dialog>
    <sys_setting_sys_user_sys_perms_role_dialog  :managerDialogFormVisible="isShowManagerDialog" :permRoleId="permDialogRoleId" @closeForm="closeForm"></sys_setting_sys_user_sys_perms_role_dialog>

  </div>



</template>




<style>
    body {
        background-color: #ffffff;
    }
</style>

<script>
    export default {
        data() {

          var validater = this.$validater;


          return {
            permRoleId:"",
            dialogFormVisible:false,
            dialogTitle:'',
            pageInfo: validater.pageInfo,
            tableData: [],
            permDialogRoleId:"",
            isShowManagerDialog:false,
            formLabelWidth: '120px',
            queryForm:{
              roleId:'',
              roleName:''
              },
            addForm:{
              roleId:'',
              roleName:'',
              uid:''
            } ,
            addPermsRoleRules: {
              roleId: [
                {
                  required: true, //是否必填
                  trigger: 'blur', //何事件触发
                  validator: validater.emptyValidator
                },
                //可以设置双重验证标准
                {min: 5, max: 20, message: '长度在 5到 20 个字符'}
              ],
              roleName: [
                {
                  required: true, //是否必填
                  trigger: 'blur',  //何事件触发
                  validator: validater.emptyValidator

                },
                //可以设置双重验证标准
                {min: 3, max: 20, message: '长度在 3 到 20 个字符',}
              ]
            },
            }
        },
      methods: {

        handleDelete(index, id) {

          var that = this;
          this.$validater.commonConfirm(that,function() {
            var params = new URLSearchParams();
            params.append('id', id);
            var url = '/sys_perms_role/del';
            that.$validater.loadingPost(that, url, params, null, '','删除成功',function (result) {
              that.loadPermsRoles();
            });
          });

        },
        addRole:function () {
          this.dialogTitle = '添加角色';
          this.addForm.uid = null;
          this.addForm.roleName = null;
          this.addForm.roleId = null;
          this.dialogFormVisible = true;
        },
        closeForm(params){

          this.isShowManagerDialog = false;
        },
        handleAddOrEditPermsRole(){
          this.$refs.addForm.validate((valid) => {

            if (valid) {
              var that = this;
              var params = new URLSearchParams();
              params.append('roleId', that.addForm.roleId);
              params.append('roleName', that.addForm.roleName);
              params.append('id', that.addForm.uid);
              var url = '/sys_perms_role/addOrEdit';
              this.$validater.loadingPost(this, url, params, null,'','操作失败' ,function (result) {


                debugger
                that.dialogFormVisible = false;
                that.loadPermsRoles();
              });

            }
          });
        },
        editRole(index,uid){

          debugger
          this.addForm.uid = uid;

          var that = this;
          var params = new URLSearchParams();
          params.append('id', uid);
          var url = '/sys_perms_role/getPermsRoleInfo';
          this.$validater.loadingPost(this, url, params, null,null,'编辑系统角色失败' ,function (result) {


            that.dialogTitle = '编辑系统角色';
            that.dialogFormVisible = true;
            that.addForm.roleName =result.role_name ;
            that.addForm.roleId = result.role_id;
            that.addForm.uid = result.id;

          });
        },
        handleSizeChange(size) {

          this.pageInfo.pageSize = size;
          this.loadPermsRoles()
        },
        handleManager(index,id){

          this.permDialogRoleId = id;
          this.isShowManagerDialog = true;
        },
        handleCurrentChange(currentPage) {

          this.pageInfo.currentPage = currentPage;
          this.loadPermsRoles();

        },
        loadPermsRoles: function () {
          var that = this;
          var params = new URLSearchParams();
          params.append('pageInfo', JSON.stringify(this.pageInfo));
          params.append('like_role_id', that.queryForm.roleId);
          params.append('like_role_name', that.queryForm.roleName);
          var url = '/sys_perms_role/list';
          this.$validater.loadingPost(that, url, params, this.pageInfo, function (results) {
            that.tableData = results;
          }, null);
        }
      },
      mounted() {

        this.loadPermsRoles();
      }
    }
</script>
