<template>

  <div>
    <el-container>
      <el-header>
        <el-form :model="queryForm" ref="addForm">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="请输入用户名" v-model="queryForm.username">
                  <template slot="prepend">用户名</template>
                </el-input>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-search" @click="loadUsers">搜索</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="addUser()">添加用户</el-button>
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
              label="日期"
              width="200px" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="text-align: center">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
            label="账号"
            width="200px" align="center">
            <template slot-scope="scope" style="text-align: center">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.username }}</el-tag>
              </div>
            </template>
          </el-table-column>
            <el-table-column
              label="用户名"
              width="200px" align="center">
              <template slot-scope="scope" style="text-align: center">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope" style="text-align: center;margin: auto">
                <el-button
                  size="mini"
                  @click="editUser(scope.$index, scope.row.id)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handlerRoleManager(scope.$index, scope.row.id)">角色配置
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)">删除
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
      <el-form :model="addForm" :rules="addUserRules" ref="addForm">
        <el-form-item  label="用户名" :label-width="formLabelWidth" prop="username">
          <el-tooltip class="item" content="长度在 5 到 20 个字符" effect="light" placement="right-start">
            <el-input v-model="addForm.username"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-tooltip class="item" content="长度在 2 到 10 个字符" effect="light" placement="right-start">
            <el-input v-model="addForm.nickname"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrEditUser">确 定</el-button>
      </div>
    </el-dialog>


    <sys_setting_sys_user_sys_user_role_dialog  :managerDialogFormVisible="isShowManagerDialog" :permUserId="permDialogUserId" @closeForm="closeForm"></sys_setting_sys_user_sys_user_role_dialog>

  </div>


</template>

<style>


  .el-col {
    border-radius: 4px;
  }

  .el-menu-demo {
    text-align: center;
    display: block !important;
    width: 100% !important;

  }

  .table {
    margin: 0px auto;
    width: 800px;
    height: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -100px;
  }

  body {
    text-align: center;
    background-color: #ffffff;
  }
</style>

<script>
  export default {
    data() {

      var validater = this.$validater;

      return {
        pageInfo : validater.pageInfo,
        tableData: [],
        permDialogUserId:"",
        dialogFormVisible: false,
        dialogTitle:'添加系统用户',
        isShowManagerDialog:false,
        queryForm: {
          username: '',
        },
        addForm: {
          username: '',
          nickname: '',
          userid :'',
        },
        addUserRules: {
          username: [
            {
              required: true, //是否必填
              trigger: 'blur', //何事件触发
              validator: validater.emptyValidator
            },
            //可以设置双重验证标准
            {min: 5, max: 20, message: '长度在 5到 20 个字符'}
          ],
          password: [
            {
              required: true, //是否必填
              trigger: 'blur',  //何事件触发
              validator: validater.emptyValidator

            },
            //可以设置双重验证标准
            {min: 5, max: 20, message: '长度在 5 到 20 个字符',}
          ],
          nickname: [
            {
              required: true, //是否必填
              trigger: 'blur',  //何事件触发
              validator: validater.emptyValidator

            },
            //可以设置双重验证标准
            {min: 2, max: 10, message: '长度在 2 到 10 个字符',}
          ]

        },

        formLabelWidth: '120px'
      }
    },

    methods: {

      handleDelete(index, id) {

        var that = this;
        this.$validater.commonConfirm(that,function() {
          var params = new URLSearchParams();
          params.append('userId', id);
          var url = '/sys_user/del';
          that.$validater.loadingPost(that, url, params,  null,'','操作失败',function (result) {
            debugger
            that.loadUsers();
          });
        });

      },

      loadUsers() {

        var that = this;
        var params = new URLSearchParams();
        params.append('pageInfo', JSON.stringify(this.pageInfo));
        params.append('like_username', that.queryForm.username);
        var url = '/sys_user/list';
        this.$validater.loadingPost(that, url, params, this.pageInfo, function (results) {
          that.tableData = results;
        }, null);
      },
      closeForm(params){

        this.isShowManagerDialog = false;
      },
      handlerRoleManager(index,userid){
        this.permDialogUserId = userid;
        this.isShowManagerDialog = true;
      },
      handleSizeChange(size) {

        this.pageInfo.pageSize = size;
        this.loadUsers();
      },
      handleCurrentChange(currentPage) {

        this.pageInfo.currentPage = currentPage;
        this.loadUsers();

      },
      addUser(){

        this.dialogTitle = '添加系统用户';
        this.dialogFormVisible = true;
        this.addForm.userid = null;
        that.addForm.username =null ;
        that.addForm.nickname = null;
      },
      editUser(index,userid){

        this.addForm.userid = userid;

        var that = this;
        var params = new URLSearchParams();
        params.append('userid', userid);
        var url = '/sys_user/getUserinfo';
        this.$validater.loadingPost(this, url, params, null,null,'获取用户信息失败' ,function (result) {

          that.dialogTitle = '编辑系统用户';
          that.dialogFormVisible = true;
          that.addForm.username =result.username ;
          that.addForm.nickname = result.nickname;
        });
      },
      handleAddOrEditUser() {
        this.$refs.addForm.validate((valid) => {

          if (valid) {

            var that = this;
            var params = new URLSearchParams();
            params.append('username', this.addForm.username);
            params.append('nickname', this.addForm.nickname);
            params.append('userid', this.addForm.userid);
            var url = '/sys_user/addOrEdit';
            this.$validater.loadingPost(this, url, params, this.pageInfo,'','操作失败' ,function () {
              that.dialogFormVisible = false;
              that.loadUsers();
            });

          }
        });

      }

    },
    mounted() {

      this.loadUsers();
    }
  }
</script>
