const merge = require('webpack-merge');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    index: './index.js',
    'index.min': './index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|\.spec\.js)/,
        use: [
          {
            loader: 'webpack-strip-block'
          }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({sourcemap:true,minimize: true,include: /\.min\.js$/}),
		new webpack.DefinePlugin({
			'process.env': {
			  'NODE_ENV': JSON.stringify('production')
		  }
    })
  ],
  externals: {
    'react': 'commonjs react', 
		'react-router-dom':'commonjs react-router-dom',
    'lodash':'commonjs lodash',
    'auth0-js':'commonjs auth0-js',
    'history': 'commonjs history'
  }
});
