const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    foo: './src/scripts/foo.js',
    a: './src/scripts/a.js',
    b: './src/scripts/b.js',
    c: './src/scripts/c.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[chunkhash].js', 
    publicPath: 'http://cdn.com'    // 上线路径
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      // inject: 'head' 脚本放进头部标签中
      inject: false,
      title: 'the title from htmlWebpackPlugin',
      // minify压缩html
      // minify: {
      //   removeComments: true, // 删除注释
      //   collapseWhitespace: true  // 删除空格
      // }
      chunks: ['index', 'foo']
    }),
    new htmlWebpackPlugin({
      filename: 'a.html',
      template: 'index.html',
      // inject: 'head' 脚本放进头部标签中
      inject: false,
      title: 'this is a.html',
      chunks: ['index', 'a']
      // excludeChunks: ['b', 'c']
    }),
    new htmlWebpackPlugin({
      filename: 'b.html',
      template: 'index.html',
      // inject: 'head' 脚本放进头部标签中
      inject: false,
      title: 'this is b.html',
      chunks: ['index', 'b']
      // excludeChunks: ['a', 'c']
    }),
    new htmlWebpackPlugin({
      filename: 'c.html',
      template: 'index.html',
      // inject: 'head' 脚本放进头部标签中
      inject: false,
      title: 'this is c.html',
      chunks: ['index', 'c']
      // excludeChunks: ['b', 'a']
    })
  ]
}
