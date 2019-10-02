/* eslint-disable no-console */
const path = require('path')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = require('./webpack.config.base')

const minimize = !!process.env.MINIMIZE
const analyzeBundle = !!process.env.ANALYZE_BUNDLE
const forceInlineDebug = !!process.env.CLAPPR_INLINE_DEBUG

const plainHtml5Plugins = [
  new webpack.DefinePlugin({ PLAIN_HTML5_ONLY: true }),
]

const defaultDefinitionPlugin = new webpack.DefinePlugin({ PLAIN_HTML5_ONLY: false })

let configurations = []

configurations.push(webpackConfig({
  filename: 'clappr.js',
  plugins: analyzeBundle ? [ new BundleAnalyzerPlugin(), defaultDefinitionPlugin ] : [defaultDefinitionPlugin],
}))

if (!analyzeBundle) {
  configurations.push(webpackConfig({
    entry: path.resolve(__dirname, 'src/base_bundle.js'),
    filename: 'clappr.plainhtml5.js',
    plugins: plainHtml5Plugins,
    mode: 'production'
  }))
}

const loaderOptions = new webpack.LoaderOptionsPlugin({ minimize, debug: !minimize })
const uglify = new UglifyJsPlugin({
  uglifyOptions: {
    warnings: false,
    compress: {},
    mangle: true,
    sourceMap: true,
    comments: false,
    output: { comments: false }
  },
})

if (minimize) {
  console.log('NOTE: Enabled minifying bundle (uglify)')

  configurations.push(webpackConfig({
    filename: 'clappr.min.js',
    plugins: [
      loaderOptions,
      defaultDefinitionPlugin
    ],
    optimization: {
      minimizer: [
        uglify,
      ],
    },
    mode: 'production'
  }))


  console.log('NOTE: Building flavor plainhtml5 with only plain HTML5 playback plugins, but will result in smaller build size')
  configurations.push(webpackConfig({
    entry: path.resolve(__dirname, 'src/base_bundle.js'),
    filename: 'clappr.plainhtml5.min.js',
    plugins: [
      loaderOptions,
      ...plainHtml5Plugins,
    ],
    optimization: {
      minimizer: [
        uglify,
      ],
    },
    mode: 'production'
  }))
}

if (forceInlineDebug) {
  console.log('NOTE: Enabling inline source-maps - this may not be suitable for production usage')
  configurations.push(webpackConfig({
    filename: 'clappr.debug.min.js',
    devtool: 'inline-source-map',
    plugins: [
      loaderOptions,
      defaultDefinitionPlugin
    ],
  }))
}

module.exports = configurations
