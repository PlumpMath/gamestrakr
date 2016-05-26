var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader!postcss-loader"
      }
    ]
  },
  postcss: function(webpack) {
    return [
      require('postcss-import')({ path: ['node_modules', './src'], addDependencyTo: webpack}),
      require('autoprefixer'),
      require('precss'),
      require('postcss-normalize')
    ];
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/gamestrakr/dist/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env.SERVER_URL': JSON.stringify('http://127.0.0.1:3000/')}),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
  ]
}
