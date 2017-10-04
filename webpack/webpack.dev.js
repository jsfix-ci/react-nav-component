const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(common, {
entry: {
   index: './render.js'
 },
 devtool: 'inline-source-map',
 devServer: {
  contentBase: './dist'
 },
  plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
		  }
		}),
		new HtmlWebpackPlugin({
			title: 'Production',
			template: './index.html'
	})
	]
});
