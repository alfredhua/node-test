process.env.NODE_ENV = 'development';
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const path = require("path");
const webpack_info = require('react-scripts/config/webpack.config');
let config=webpack_info('development');
const overrides = require('../config-overrides');

config.resolve.alias={
  '@common': 'common/components'
}
config.output.path=path.resolve(__dirname, "../build");
config.output.publicPath='/static/auth/';

webpack(overrides.webpack(config, process.env.NODE_ENV)).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}