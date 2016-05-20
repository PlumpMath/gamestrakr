var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
      require('precss'),
      require('postcss-normalize')
    ];
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/gamestrakr/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env.SERVER_URL': '"https://gamestrackr-server.herokuapp.com"'})
  ]
};
