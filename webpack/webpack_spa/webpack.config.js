const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,  // 忽略node_modules文件夹下js
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest']
          }
        } 
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1  // 指定@import的css经过css-loader之后再经过几个loader处理
          }
        }, {
          loader: 'postcss-loader',
          options: {
            indent: 'postcss',
            plugins: (loader) => [
              require('autoprefixer')({
                browsers: ['last 5 versions']
              })
            ]
          }
        }]
      },
      {
        test: /\.stylus$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            indent: 'postcss',
            plugins: (loader) => [
              require('autoprefixer')({
                browsers: ['last 5 versions']
              })
            ]
          }
        }, {
          loader: 'stylus-loader'
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            name: 'images/[name]-[hash:5].[ext]'
          }
        }, {
          loader: 'image-webpack-loader'
        }]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ]
}
