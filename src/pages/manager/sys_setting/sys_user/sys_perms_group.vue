<template>
  <div>
    <el-container>
      <el-header>
        <el-form :model="queryForm" ref="addForm">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="请输入权限集名称" v-model="queryForm.permGroupName">
                  <template slot="prepend">名称</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="请输入权限集标识" v-model="queryForm.permGroupId">
                  <template slot="prepend">标识</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-search" @click="loadPermsGroups()">搜索</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="addPermGroup()">添加权限集</el-button>
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
              label="权限集标识"
              width="300px" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="text-align: center">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="权限集名称"
              width="300px" align="center">
              <template slot-scope="scope" style="text-align: center">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope" style="text-align: center;margin: auto">
                <el-button
                  size="mini"
                  type="info"
                  @click="editUser(scope.$index, scope.row.uid)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.uid)">删除
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleManager(scope.$index, scope.row.uid)">管理
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
      <el-form :model="addForm" :rules="addPermsGroupRules" ref="addForm">
        <el-form-item  label="权限集id" :label-width="formLabelWidth" prop="username">
          <el-tooltip class="item" content="长度在 5 到 20 个字符" effect="light" placement="right-start">
            <el-input v-model="addForm.permGroupId"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="权限集名称" :label-width="formLabelWidth" prop="password">
          <el-tooltip class="item" content="长度在 5 到 20 个字符" effect="light" placement="right-start">
            <el-input v-model="addForm.permGroupName"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrEditPermsGroup">确 定</el-button>
      </div>
    </el-dialog>

    <sys_setting_sys_user_sys_perms_group_manager :managerDialogFormVisible="isShowManagerDialog" :permGroupId="permGroupManagerId" @closeForm="closeForm"></sys_setting_sys_user_sys_perms_group_manager>

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
            permGroupManagerId:"",
            dialogFormVisible:false,
            dialogTitle:'',
            pageInfo: validater.pageInfo,
            formLabelWidth: '120px',
            tableData: [],
            isShowManagerDialog :false,
            addForm:{
              permGroupName:'',
              permGroupId:'',
              uid:''

            } ,
              queryForm:{
                permGroupName:'',
                permGroupId:''
              },
            addPermsGroupRules: {
              permGroupName: [
                {
                  required: true, //是否必填
                  trigger: 'blur', //何事件触发
                  validator: validater.emptyValidator
                },
                //可以设置双重验证标准
                {min: 5, max: 20, message: '长度在 5到 20 个字符'}
              ],
              permGroupNameId: [
                {
                  required: true, //是否必填
                  trigger: 'blur',  //何事件触发
                  validator: validater.emptyValidator

                },
                //可以设置双重验证标准
                {min: 5, max: 20, message: '长度在 5 到 20 个字符',}
              ]

            },
            }
        },
      methods:{
        loadPermsGroups: function () {
          var that = this;
          var params = new URLSearchParams();
          params.append('pageInfo', JSON.stringify(this.pageInfo));
          params.append('like_name', that.queryForm.permGroupName);
          params.append('like_id', that.queryForm.permGroupId);
          var url = '/sys_perms_group/list';
          this.$validater.loadingPost(that, url, params, this.pageInfo, function (results) {
            that.tableData = results;
          }, null);
        },
        handleManager(index,id){

          this.permGroupManagerId = id;
          this.isShowManagerDialog = true;
        },
        handleSizeChange(size) {

          this.pageInfo.pageSize = size;
          this.loadPermsGroups()
        },
        handleCurrentChange(currentPage) {

          this.pageInfo.currentPage = currentPage;
          this.loadPermsGroups();

        },
        closeForm(params){
          //this.permGroupManagerId = "";
          this.isShowManagerDialog = false;
        },
        handleAddOrEditPermsGroup(){
          this.$refs.addForm.validate((valid) => {

            if (valid) {

              var that = this;
              var params = new URLSearchParams();
              params.append('permsGroupId', this.addForm.permGroupId);
              params.append('permsGroupName', this.addForm.permGroupName);
              params.append('uid', this.addForm.uid);
              var url = '/sys_perms_group/addOrEdit';
              this.$validater.loadingPost(this, url, params, this.pageInfo,'','操作失败' ,function () {
                that.dialogFormVisible = false;
                that.loadPermsGroups();
              });

            }
          });
        },
        handleDelete(index, id) {

          var that = this;
          this.$validater.commonConfirm(that,function() {
            var params = new URLSearchParams();
            params.append('uid', id);
            var url = '/sys_perms_group/del';
            that.$validater.loadingPost(that, url, params, that.pageInfo, '删除成功', null,function (result) {
              that.loadPermsGroups();
            });
          });

        },
        editUser(index,uid){

          this.addForm.uid = uid;

          var that = this;
          var params = new URLSearchParams();
          params.append('uid', uid);
          var url = '/sys_perms_group/getPermsGroupInfo';
          this.$validater.loadingPost(this, url, params, this.pageInfo,null,'编辑系统权限集失败' ,function (result) {

            that.dialogTitle = '编辑系统权限集';
            that.dialogFormVisible = true;
            that.addForm.permGroupName =result.name ;
            that.addForm.permGroupId = result.id;;
          });
        },

        addPermGroup(){

          this.dialogTitle = '添加权限集';
          this.addForm.uid = null;
          this.addForm.permGroupName = null;
          this.addForm.permGroupId = null;
          this.dialogFormVisible = true;


        },
      },
      mounted() {

        this.loadPermsGroups();
      }
    }
</script>
