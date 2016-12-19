const path = require('path')

const webpack = require('webpack')

const webpackValidator = require('webpack-validator')

const {getIfUtils, removeEmpty} = require('webpack-config-utils')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = path.resolve

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  return webpackValidator({
    context: resolve('src'),
    entry: {
      index: './js/index.js',
      members: './js/members.js'
    },
    output: {
      filename: 'static/js/[name].[hash:8].js',
      path: resolve('dist'),
      pathinfo: ifNotProd()
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        removeEmpty(
          {
            test: /\.css$/,
            loaders: ifNotProd(['style-loader', 'css-loader?importLoaders=1', 'postcss-loader']),
            loader: ifProd(ExtractTextPlugin.extract({
              fallback: 'style-loader',
              loader: [
                {loader: 'css-loader?importLoaders=1'},
                {loader: 'postcss-loader'}
              ]
            }))
          }
        ),
        {
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|gif|jpg)/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.svg/,
          loader: 'file-loader'
        },
        {
          test: /\.json/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
      ifProd(new ExtractTextPlugin('static/css/[name].[contenthash:8].css')),
      new HtmlWebpackPlugin({
        chunks: ['index'],
        filename: 'index.html',
        template: './index.html',
        favicon: './media/favicon.png'
      }),
      new HtmlWebpackPlugin({
        chunks: ['members'],
        filename: 'members/index.html',
        template: './members.html',
        favicon: './media/favicon.png'
      })
    ]),
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      host: '0.0.0.0',
      port: 3000
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: false
    }
  })
}
