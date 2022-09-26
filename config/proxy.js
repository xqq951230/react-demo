/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // 代理
    '/kapi': {
      target: 'http://open-jyglj-dev.zfy.zjsjy.gov/',
      // target: 'http://10.250.196.181:9099/',
      secure: false,
      changeOrigin: true,
    },
    // 代理
    // '/business-manager-http/': {
    //   target: 'http://192.168.1.59:9097/',
    //   // target: 'http://10.250.196.181:9099/',
    //   secure: false,
    //   changeOrigin: true,
    // },
    // 'kapi/business-manager-http/': {
    //   // target: 'http://10.250.200.150/',
    //   target: 'http://open-jyglj-dev.zfy.zjsjy.gov/',
    //   secure: false,
    //   changeOrigin: true,
    // },
  },
  test: {
    // 代理
    '/kapi/business-manager-http/': {
      target: 'http://open-jyglj-dev.zfy.zjsjy.gov/',
      secure: false,
      changeOrigin: false,
    },
    // 'kapi/business-manager-http/': {
    //   // target: 'http://10.250.200.150/',
    //   target: 'http://open-jyglj-dev.zfy.zjsjy.gov/',
    //   secure: false,
    //   changeOrigin: false,
    // },
  },
  pre: {
    '/kapi/': {
      target: 'your pre url',
      changeOrigin: true,
      // pathRewrite: {
      //   '^': '',
      // },
    },
  },
};
