const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); 
const path = require('path');
const server_port=process.env.platform==='pc'?5100:3100;//pc服务5001，h5服务3001
const port=process.env.platform==='pc'?5000:3000;//pc服务5000，h5服务3000
const platform=process.env.platform==='pc'?'pc':'h5';
var dev=process.env.NODE_ENV==='dev';
var glob = require("glob");
files = glob.sync(`./static/${platform}/script/**/*.js`);

function entry(name){
    if(dev){
        return [name];
    }
    return name;
}

function entries(files){
    var ret={};
    files.map((val) => {
        var name = val.slice((`./static/${platform}/script/`).length);
        if(name.indexOf("library")!=0){
          ret[name]=entry(val)
        }
    });
    return ret;
}
function cp_files(){
  let files=[{
    from:path.resolve(__dirname, "./static/"+platform+"/images"),
    to:path.resolve(__dirname,"./dist/static/"+platform+"/images")
    },{
      from:path.resolve(__dirname, "./static/"+platform+"/script/library"),
      to:path.resolve(__dirname,"./dist/static/"+platform+"/script/library")
    }]
  glob.sync(`./static/${platform}/style/**/*.css`).map((val) => {
      files.push({from:path.resolve(__dirname, val),to:path.resolve(__dirname,"./dist/"+val)})
  });
  return files;
}

module.exports = {
  mode: 'development',
  entry: entries(files),
  output: {
    publicPath: '/',
    filename: './static/'+platform+'/script/[name]',
    path: path.resolve('dist')
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
        use:[
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
             options: {
              importLoaders: 1,
              modules: true, 
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ],
        exclude: /node_modules/,
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
      },
      {
        test: /\.mp4$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: "./static/"+platform+"/style/[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin([...cp_files()]),
    new webpack.optimize.SplitChunksPlugin({
      names: 'vendor',
      minChunks: Infinity
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({ minimize: true })
  ],
  devServer:{
    proxy: {
      '*': {
      target: 'http://127.0.0.1:'+server_port,
      secure: false,
      bypass: function(req){
        if(req.method !="POST"){
          return req.url;
        }
       }
      }
    },
    contentBase: __dirname + "/static/"+platform,
    inline: true,
    port: port,
    historyApiFallback: true
  },
};