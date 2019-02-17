<template>
  <div>
    <el-container>

      <el-main>
        <div>
          <el-table
            :data="tableData" align="center" :border="true" cellpadding="0" cellspacing="0"
            style="vertical-align:center"
            width="100%">
            <el-table-column
              label="权限名称"
              width="400px" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="text-align: center">{{ scope.row.commont }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="权限url"
              width="500px" align="center">
              <template slot-scope="scope" style="text-align: center">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.url }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="访问方式"
              width="300px" align="center">
              <template slot-scope="scope" style="text-align: center">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.method }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope" style="text-align: center;margin: auto">
                <el-button size="mini" type="primary">
                  查看该权限权限集
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
        queryForm: {
          permsName: '',
          permsUrl: ''
        },
      }

    },
    methods: {
      loadPerms: function () {
        var that = this;
        var params = new URLSearchParams();
        params.append('pageInfo', JSON.stringify(this.pageInfo));
        params.append('like_permName', that.queryForm.permsName);
        params.append('like_permUrl', that.queryForm.permsUrl);
        var url = '/sys_perms/list';
        this.$validater.loadingPost(that, url, params, this.pageInfo, function (results) {
          debugger
          that.tableData = results;
        }, null);
      },

      handleSizeChange(size) {

        this.pageInfo.pageSize = size;
        this.loadPerms();
      },
      handleCurrentChange(currentPage) {

        this.pageInfo.currentPage = currentPage;
        this.loadPerms();

      }

    },
    mounted() {

      this.loadPerms();
    }
  }
</script>
