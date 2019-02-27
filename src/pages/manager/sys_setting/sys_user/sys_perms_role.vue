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

            pageInfo: validater.pageInfo,
            tableData: [],

            queryForm:{
              roleId:'',
              roleName:''
              }
            }
        },
      methods: {

        addRole:function () {

        },
        handleSizeChange(size) {

          this.pageInfo.pageSize = size;
          this.loadPermsRoles()
        },
        handleCurrentChange(currentPage) {

          this.pageInfo.currentPage = currentPage;
          this.loadPermsRoles();

        },
        loadPermsRoles: function () {
          debugger
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
