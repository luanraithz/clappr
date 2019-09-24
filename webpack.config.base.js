const path = require('path')
const webpack = require('webpack')

const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const { DuplicatesPlugin } = require('inspectpack/plugin')

const webpackConfig = (config) => {
  return {
    devServer: {
      contentBase: [
        path.resolve(__dirname, 'public'),
      ],
      disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/882
      compress: true,
      host: '0.0.0.0',
      port: 8080
    },
    mode: config.mode || 'development',
    devtool: config.devtool || 'source-maps',
    optimization: config.optimization,
    entry: config.entry || path.resolve(__dirname, 'src/main.js'),
    externals: config.externals,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: /node_modules\/@clappr/,
          exclude: [
            path.resolve(__dirname, 'node_modules', 'hls.js'),
          ]
        },
        {
          test: /fonts\.css$/,
          loaders: ['css-loader', 'postcss-loader'],
          include: [
            path.resolve(__dirname, 'node_modules', '@clappr/plugins/src/public'),
          ]
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader?singleton=true', 'css-loader', 'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules', '@clappr/plugins/src/public'),
                  path.resolve(__dirname, 'node_modules', '@clappr/plugins/src/public/scss')
                ]
              }
            }
          ],
        },
        {
          test: /\.(png|woff|eot|swf|cur|ttf)/,
          loader: 'url-loader',
          options: {
            limit: 1,
            publicPath: '<%=baseUrl%>/'
          },
        },
        {
          test: /\.svg/, loader: 'svg-inline-loader'
        },
        {
          test: /\.html/, loader: 'html-loader?minimize=false'
        },
        ...(config.rules || [])
      ],
    },
    resolve: {
      alias: {
        'clappr-zepto': 'clappr-zepto/zepto.js',
        '@clappr/core': '@clappr/core/src/main.js',
        '@clappr/plugins': '@clappr/plugins/src/main.js',
        '@clappr/hlsjs-playback': '@clappr/hlsjs-playback/src/hls.js',
        '@clappr/flash-playback': '@clappr/flash-playback/src/main.js',
        '@clappr/flashls-playback': '@clappr/flashls-playback/src/flashls.js',
      },
      plugins: [
        new DirectoryNamedWebpackPlugin(true),
      ],
      modules: [
        'node_modules'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/',
      filename: config.filename,
      library: 'Clappr',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('./package.json').version),
      }),
      new DuplicatesPlugin({
        // Emit compilation warning or error? (Default: `false`)
        emitErrors: false,
        // Display full duplicates information? (Default: `false`)
        verbose: false
      }),
      ...(config.plugins || [])
    ],
  }
}

module.exports = webpackConfig
