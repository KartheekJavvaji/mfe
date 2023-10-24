const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getClientEnvironment = require('./env')
const getWebpackConfigBase = require('./webpack.config.base')

const publicUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/'
const env = getClientEnvironment(publicUrl)

module.exports = function () {
  const webpackConfigBase = getWebpackConfigBase(env);
  console.log('Building Root for shouldBuildAsMFE: ', env.raw.shouldBuildAsMFE);
  const config = Object.assign(
    {},
    webpackConfigBase,
    {
      mode: 'production',
      devtool: 'source-map',
      output: {
        clean: true,
        path: path.resolve(process.cwd(), 'build'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            include: [
              path.resolve(process.cwd(), 'src'),
              path.resolve(process.cwd(), '../app-component-system/src'),
            ],
            loader: require.resolve('babel-loader'),
            options: {
              // TODO would we be reusing the very same machines everytime we build? use cacheDirectory and cacheCompression accordingly
            }
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
          {
            test: /\.s[ac]ss$/,
            exclude: /\.module\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.module\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(jpe?g|gif|png|woff2?|ttf|eot)$/, // TODO 2 remove all assets from this and move to CDN
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.svg$/i,
            type: 'asset/resource',
            resourceQuery: { not: [/comp/] }, // exclude react component if the pattern is not *.svg?comp
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            resourceQuery: /comp/, // *.svg?comp
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  typescript: true,
                  ext: "tsx",
                }
              },
            ]
          }
        ]
      },
      plugins: [
        ...webpackConfigBase.plugins,
        new HtmlWebpackPlugin({
          template: path.join(process.cwd(), './public/index.html'),
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(process.cwd(), 'public'),
              filter: async (resourcePath) => {
                return !(resourcePath.endsWith('.html'))
              }
            }
          ]
        }),
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[id].[contenthash:8].css',
          ignoreOrder: false // Enable to remove warnings about conflicting order
        }),
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.esbuildMinify // slightly larger builds, but very fast than the default one
          }),
          new CssMinimizerPlugin()
        ]
      }
    }
  )

  console.log('Using production mode config - ', config)
  return config
}
