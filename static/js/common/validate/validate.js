function validater() {

    this.pageInfo = {
      totalCount: 0,
      currentPage: 1,
      pageSize: 5
  }

  this.show = function () {
    alert('aacac')
  },

    this.emptyValidator = function (rule, value, callback) {

      if (!value) {
        return callback(new Error('输入项不能为空'));
      } else {
        return callback() // 一些同学的问题可能就出在这里
      }
    },
    this.showSuccessBottomRight = function (obj,msg) {
      obj.$notify({
        title: '成功',
        message:msg,
        type: 'success',
        position: 'bottom-right'
      });
    },
    this.showErrorBottomRight = function (obj,msg) {
      obj.$notify.error({
        title: '失败',
        message:msg,
        position: 'bottom-right'
      });
    },
    this.showTitleErrorBottomRight = function (obj,title,msg) {
      obj.$notify.error({
        title: title,
        message:msg,
        position: 'bottom-right'
      });
    },
    this.showErrorTopCenterMessage = function (obj,msg) {
      obj.$message.error(msg);
    },
    this.goTo = function(obj,url){
      obj.$router.push(url);
    },
    this.doPost = function (obj,url,params,successFunc,errorFunc) {
      obj.$axios.post(
        url, params)
        .then(function (response) {

          successFunc(response);


        })
        .catch(function (error) {
          errorFunc(error);
        });
    },
    this.showLoading = function (obj,msg) {
      if(msg == null||msg ==''||msg =='undefined'){
         msg = '加载中';
      }
      const loading = obj.$loading({
        lock: true,
        text: msg,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      return loading;
    },
    this.hiddenLoading = function (obj) {
       obj.close();
    },
    this.commonConfirm = function (that,doFunction) {
      that.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {


        doFunction();
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    this.loadingPost= function (that,url,params,pageInfo,successMsg,failedMsg,successCallBackFunc) {


      var loading = that.$validater.showLoading(that);

      that.$validater.doPost(that,
        url, params,
        function (response) {



          that.$validater.hiddenLoading(loading)
          if (response.data.success) {


            if(pageInfo !=null&&pageInfo!='undefined'){
              pageInfo.totalCount = response.data.totalCount;
            }


            var msg = '操作成功';
            if(successMsg == null){
              if(successCallBackFunc !=null&&successCallBackFunc!='undefined') {
                successCallBackFunc(response.data.data);
              }
            }
            else if(successMsg==''||successMsg=='undefined'){
              if(response.data.message !=null&&response.data.message!=''&&response.data.message!='undefined'){
                 msg = response.data.message;
              }
              that.$validater.showSuccessBottomRight(that,msg);
              if(successCallBackFunc !=null&&successCallBackFunc!='undefined') {
                successCallBackFunc(response.data.data);
              }
            }else if(typeof successMsg=='function'){
               successMsg(response.data.data);
            }else {
              that.$validater.showSuccessBottomRight(that,successMsg);
            }

          } else {
            debugger
            var msg = '操作失败';
            if(failedMsg == null && response.data.message==null){
              return;
            }
            else  if(failedMsg==''||failedMsg=='undefined'||(failedMsg ==null&&response.data.message!=null)){
              that.$validater.showTitleErrorBottomRight(that, msg, response.data.message);
            }else if(typeof successMsg=='function'){
                failedMsg(response.data.message);
            }else {
              that.$validater.showTitleErrorBottomRight(that, msg, response.data.message);
            }
          }
        },
        function (error) {
          that.$validater.hiddenLoading(loading)
          debugger
          if(error.response != null &&error.response !='undefined' ){
            if(error.response.data.message =="401"){
              that.$validater.goTo(that,'/login')
              that.$validater.showTitleErrorBottomRight('请求失败',that, '请登陆系统后再继续操作');
            }else {
              that.$validater.showErrorBottomRight(that, error.response.data.message);
            }
          }else {
            that.$validater.showErrorBottomRight(that, error);
          }


        });
    }


}


var validate = new validater();


export { //很关键
  validate
}

