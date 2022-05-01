module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()

    // add replacement loader(s)
    svgRule
        .use('svgo-loader')
        .loader('svgo-loader')
        .tap(() => {
          return {
            removeStyleElement: true,
          }
        })
  }
}
