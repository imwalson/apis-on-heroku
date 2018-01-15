'use strict';
const path = require('path')

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1507037688897_2770';

  // add your config here
  config.middleware = [
    
  ];

  config.static = {
    prefix: '/public/', 
    dir: path.join(appInfo.baseDir, '/app/public')
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // 关闭 csrf ，防止代理转发失败
  config.security = {
    csrf: {
      enable: false,
    }
  }

  // 自定义参数
  config.global = {
    appId: process.env.APP_ID || 'AP328801193931309056',
    accessToken: process.env.ACCESS_TOKEN || 'c7bd3003fca94e21aa830db8ed34ebeb',
    apiUrl: process.env.API_URL || 'http://api.bto-dev.utoper.com',
    accountUrl: process.env.ACCOUNT_URL || 'http://account.bto-dev.utoper.com',
    staticUrl: process.env.STATIC_URL || '/public/front',
    staticVersion: new Date().getTime(),
    fileUrl: process.env.FILE_URL || 'http://files.bto-dev.utoper.com'
  };

  //D8 VIDEO 参数
  config.d8video = {
    HOST: process.env.d8video_HOST || 'email.d8dizhi.at.gmail.com.d8-app.space',
    baseURL: process.env.d8video_baseURL || 'http://email.d8dizhi.at.gmail.com.d8-app.space',
    videoUrlBase: process.env.d8video_videoUrl || 'http://email.d8dizhi.at.gmail.com.8spd.space',
    apiMap: {
      newest: process.env.d8video_api_newest || '/api/v2/videos/latest', // 最新视频
      videoTags: process.env.d8video_api_videoTags || '/api/v2/tags/alphabet', // 视频标签列表
      videoList: process.env.d8video_api_videoList || '/api/v2/videos',  // 视频列表
      videoInfo: process.env.d8video_api_videoInfo || '/api/v2/video/', // 视频详情
      videoPath: process.env.d8video_api_videoPath || '/v/video_v_href/' // 获取视频文件地址
    }
  };

  return config;
};
