const fs = require('fs')

// need to add in case of self-signed certificate connection
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

module.exports = {
  transpileDependencies: [
    'has-flag',
    'supports-color',
    'vue-prism'
    // Vue CLI Babel plugin은 기본적으로 node_modules에 대한 transpiling은 하지 않음. 그래서 별도로 IE에서 지원할 수 없는 ES6+를 사용하는 dependencies들에 대해 transpiling 처리를 해줘야 합니다 ㅠ
  ],
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import '@/style/mixins.scss';
          @import '@/style/vars.scss';
          @import '@/style/themes/default.scss';
          @import '@/style/themes/dark.scss';
        `
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      mainFields: ['wj-esm5', 'module', 'main']
    }
  },
  devServer: process.env.VUE_APP_HTTPS_ENABLE === 'true' ? {
    https: {
      key: fs.readFileSync('./keys/miip.key'),
      cert: fs.readFileSync('./keys/miip.crt'),
      ca: fs.readFileSync('./keys/miip-rootca.crt')
    },
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true
  } : {}
}
