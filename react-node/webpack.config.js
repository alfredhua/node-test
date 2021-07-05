const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var glob = require("glob");
files = glob.sync(`./bzr/static/js/**/*.js`);

function entries(files) {
    var ret = {};
    files.map((val) => {
        var name = '';
        name = val.slice((`./bzr/static/js/`).length);
        ret[name] = val;
    });
    return ret;
}

module.exports = {
    mode: 'development',
    entry: entries(files),
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist/']),
        new HtmlWebpackPlugin({
            title: 'Development',
            filename:'./dist/index.html',    //生成的html存放路径，相对于 path
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env']
                }
                
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name]-[hash].js',
    },
    devServer:{
        proxy: {
          '*': {
          target: 'http://localhost:7405',
          changeOrigin: true,
          secure: false
          }
        },
        inline: true,
        port: 7405,
        historyApiFallback: true
      },
}
