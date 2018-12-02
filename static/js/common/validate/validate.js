function validater() {

  this.show = function () {
    alert('aacac')
  },

    this.emptyValidator = function (rule, value, callback) {

      if (!value) {
        return callback(new Error('用户名不能为空'));
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
    }


}


var validate = new validater();


export { //很关键
  validate
}

