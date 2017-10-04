const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	 plugins: [
			new StyleLintPlugin(),
			new CleanWebpackPlugin(['../dist']),
			new ExtractTextPlugin("index.css")		 
	],
   resolve:{
     extensions: ['.js']
   },
   module: {
       loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			loaders: ['eslint-loader','babel-loader']
		},
		{ test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader!postcss-loader")},
		{
			test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,use: 'base64-inline-loader?limit=5000&name=[name].[ext]'
		}
       ]
   },
    devtool: 'source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname,"..", 'dist'),
		library: 'reactnavcomponent',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		//publicPath: '/'
	}
};
