var path = require( 'path' );
var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = function () {
	return {
		entry: {
			main: './demo/wheel.js',
		},
		devtool: 'source-map',
		devServer: {
			historyApiFallback: true,
			inline: true,
			hot: true
		},
		output: {
			path: path.resolve( __dirname, 'dist' ),
			filename: 'demo.js',
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [ 'es2015', 'react' ]
						}
					}
				},
				{
					test: /\.(scss|sass)$/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						{
							loader: 'sass-loader',
							options: {}
						}
					]
				},
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin(),
			new webpack.DefinePlugin( {
				'process.env': {
					'NODE_ENV': '"development"'
				}
			} )
		],
	}
};
