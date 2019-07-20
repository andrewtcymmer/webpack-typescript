const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/index.ts', './src/index.webpacktemplate.html'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
    // The above path is relative to the directory of this file!
    // Without the ../ the build would end up in config/dist/
  },
  resolve: {
    extensions: ['.css', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: [/dist/, /node_modules/],
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: [/dist/, /node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            /*
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
            */
          },
          'css-loader',
        ]
      },
      {
        test: /\.ts$/,
        exclude: [/dist/, /node_modules/],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.webpacktemplate.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: true 
    })
  ]
};
