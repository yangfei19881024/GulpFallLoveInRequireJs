module.exports = {
  appDir: 'www',
  baseUrl: 'js/',
  mainConfigFile: 'www/js/common.js',
  dir: 'www-release',
  preserveLicenseComments: false,
  modules: [
    // First set up the common build layer.
    {
      // module names are relative to baseUrl
      //结果就是 把 common.js 和 include中的几个文件一起打包压缩 成一个文件
      name: 'common',
      include: [
        'app/models/basicModel',
        'jquery',
        'bootstrap',
      ]
    },

    //在 app/util/index文件中 需要依赖 'jquery','app/models/aboutModel','bootstrap',
    //这三个文件。exclude 意思：在打包压缩的时候 需要把 common 模块中 和 上面依赖的全部去除掉

    //include 是在压缩打包的时候 把 name为 app/main-about.js 的文件 和 include 中的模块(js文件)一起打包
    {
      name: 'app/main-about',
      include:["app/util/index"],
      exclude: ['common']
    },

    {
      name: 'app/main-contact',
      exclude: ['common']
    }
  ]
};
