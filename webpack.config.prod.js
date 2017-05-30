var path = require( 'path' );
var webpack = require('webpack');

module.exports = function () {
	return {
		entry: {
			main: './src/index.js'
		},
		output: {
			path: path.resolve( __dirname, 'dist' ),
			filename: 'index.js',
			sourceMapFilename: 'index.js.map',
			library: 'RandomWheel',
			libraryTarget: 'umd',
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
		externals: {
			'react': {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
			},
		},
		plugins: [
			new webpack.DefinePlugin( {
				'process.env': {
					'NODE_ENV': '"production"'
				}
			} )
		]

	}
};
