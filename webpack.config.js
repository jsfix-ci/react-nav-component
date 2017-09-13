'use strict';
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports =  {
  entry: {
		bundle: "./nav.js"
	},
	plugins: [new ExtractTextPlugin("index.css"), new UglifyJSPlugin() ],
  module:{
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },
		{ test: /\.css$/,loader:ExtractTextPlugin.extract("css-loader?minimize") },
		{
		  test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,use: 'base64-inline-loader?limit=5000&name=[name].[ext]'
		}
  ]
  },
  externals: {
    'react': 'commonjs react', 
		'react-router-dom':'commonjs react-router-dom',
		'lodash':'commonjs lodash'
  },
	output:{
    libraryTarget: 'umd',
  	filename: 'index.js',	
		path: path.resolve(__dirname, 'dist')
	},
  resolve: {
    extensions: ['.js', '.jsx']
  },
}
