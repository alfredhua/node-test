const { override, fixBabelImports,addWebpackAlias,watchAll,addLessLoader,overrideDevServer,addBabelPlugins,babelInclude } = require('customize-cra');
const path = require('path');

const rewiredMap = () => config => {
  return config;
};

module.exports ={
   webpack:override(
    rewiredMap(),
    ...addBabelPlugins(
      "@babel/plugin-transform-object-assign",
      "@babel/plugin-transform-runtime"
    ),
    babelInclude([
      path.resolve("./src"), 
      path.resolve("../common")
    ]),
    fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
    addLessLoader({
       javascriptEnabled: true,
       modifyVars: { '@primary-color': '#1DA57A' },
     }),
     addWebpackAlias({
      '@common': 'common/components'
    })
  ),
  // devServer: overrideDevServer(
  //   // dev server plugin
  //   watchAll()
  // )
};