const path = require('path');
const Webpack = require('Webpack');
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  mode: 'production',
  devtool:'none',
  entry: [path.resolve(__dirname, './static/main.js')],
  output: {
    path: __dirname+ '/dist/static/auth/',
    filename: '[name].js',
    publicPath: '/static/auth/'
  },
  optimization: {
    minimize: true
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
              // localIdentName: '[name]__[local]__[hash:base64:5]',
              localIdentName: '[local]'

            }
          }
        ],
        // exclude: /node_modules/,
      }, 
      {
        test: /\.less$/,
        use:[
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader', 
          },{  
            loader: 'less-loader',
            options: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
            },
          }
        ]
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
  plugins:[ 
    new Webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',//算法
      test: new RegExp(
           '\\.(js|css)$'    //压缩 js 与 css
      ),
      threshold: 10240,//只处理比这个值大的资源。按字节计算
      minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
   })
  ],
  devServer:{
    proxy: {
        "*": "http://localhost:4000"
    },
    port:4001,
    publicPath: '/static/auth/',
  historyApiFallback: true
}
};