/**
 * 支付
 * @param   {object}    params              请求参数 同wx.requestPayment参数
 * @returns {object}                        void
 */
export default (params) => {
    const options = {
      ...params,
      success(res) {
        params.success && params.success(true, res);
      },
      fail(err) {
        let {
          errMsg,
        } = err;
        if (errMsg === 'requestPayment:fail cancel') {
          errMsg = '您取消了支付！';
        }
        wx.showToast({
          title: errMsg,
          icon: 'none',
          duration: 3000,
          mask: false,
        });
        params.fail && params.fail(err);
      },
      complate() {
        params.complete && params.complete();
      },
    };
    return wx.requestPayment(options);
  };
  