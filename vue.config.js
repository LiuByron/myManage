module.exports = {
  // 反向代理
  devServer: {
    open: true,

    host: 'localhost',

    port: 8080,

    https: false,

    hotOnly: false,

    // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方
    proxy: {
      // 跨域配置
      '/api': {
        target: 'https://vuets-api.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

    before: app => {}
  }
};