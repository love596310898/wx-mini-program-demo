const app = getApp();
/**
 * HTTPS 网络请求工具函数
 * @see     {@link https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html}
 *
 * @param   {object}    params              请求参数 同wx.request参数
 * @param   {boolean}   params.showLoading  是否显示加载对话框, 默认false
 * @param   {boolean}   params.basePath     是否使用特定的basePath, 覆盖全局的basePath(一般用于开发环境)
 * @returns {object}                        RequestTask网络请求任务对象
 */
export default (params) => {
  const { basePath, isShowLoading = false } = params;
  const { token } = app.globalData;
  if (isShowLoading) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
  }

  wx.request({
    ...params,
    url: `${basePath || app.globalData.basePath}${params.url}`,
    header: {
      ...params.header,
      Authorization: token,
    },
    success(res) {
      if (isShowLoading) wx.hideLoading();
      // 登录失效时 重新进入登录界面
      if (res.data && res.data.Code === 401) {
        wx.showToast({
          title: '登录失效',
          icon: 'none',
          duration: 3000,
          mask: true,
          success() {
            app.$_global_goToLogin();
          },
        });
      }
      else {
        /**
         * 执行成功回调函数
         * @param {object}  data  开发者服务器返回的数据主体
         * @param {object}  res   wx.request封装的响应对象, 还包括了其他额外的数据
         */
        params.success && params.success(res.data, res);
      }
    },
    fail(err) {
      if (isShowLoading) wx.hideLoading();
      wx.showToast({
        title: '网络错误, 稍后重试！',
        icon: 'none',
        duration: 3000,
        mask: false,
      });
      params.fail && params.fail(err);
    },
    complete(res) {
      params.complete && params.complete(res);
    },
  });
};