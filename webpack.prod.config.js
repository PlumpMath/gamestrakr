var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
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
  plugins: [
    new webpack.DefinePlugin({'process.env.SERVER_URL': JSON.stringify('https://gamestrakr-server.herokuapp.com')}),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ]
};
