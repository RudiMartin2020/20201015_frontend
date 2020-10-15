module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise'
      ]
    }]
  ],
  plugins: [
    '@babel/plugin-transform-template-literals'
  ]
}
