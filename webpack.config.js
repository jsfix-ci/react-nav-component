'use strict';
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports =  {
  entry: {
		bundle: "./nav.js"
	},
	plugins: [new ExtractTextPlugin("index.css"),new OptimizeCssAssetsPlugin(), new UglifyJSPlugin() ],
  module:{
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },
		{ test: /\.css$/,loader:ExtractTextPlugin.extract("css-loader") },
    {   
			test: /\.svg$/,loader: 'svg-inline-loader'
		}, 
    {
		  test: /\.(jpe?g|png|gif)$/i,
			loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]','image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false']
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
