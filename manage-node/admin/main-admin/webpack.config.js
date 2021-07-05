const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); 
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, './static/main.js')],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env',"react", "stage-0", "stage-3"],
            plugins: ["transform-runtime", "syntax-async-functions", "transform-function-bind"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true, // 新增对css modules的支持
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test:/\.(png|jpg|gif|jpeg)$/,
        loader:'url-loader?limit=2048'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname,'./build')], { verbose: false }),
    new webpack.optimize.SplitChunksPlugin({
      names: 'vendor',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
      // 官方文档推荐使用下面的插件确保 NODE_ENV
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ],
  devServer:{
    proxy: {
      '*': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure: false,
      bypass: function(req){
        if(req.method !="POST"){
          return req.url;
        }
       }
      }
    },
    contentBase: __dirname + "/static/",
    inline: true,
    port: 4001,
    historyApiFallback: true
  },
};