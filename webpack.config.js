const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: './src/main.js',
  mode,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      { test: /\.(js)$/, use: 'babel-loader' },
    ],
  },

  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'src'),
  //   },
  // },

  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  devtool:
    process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'static', to: 'static', noErrorOnMissing: true }],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'field.html',
      template: './src/field.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
