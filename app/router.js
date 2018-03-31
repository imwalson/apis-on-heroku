'use strict';
const proxy = require('koa-proxy');

module.exports = app => {
  // 默认路由
  app.get('/', 'home.index');

  // D8 Video
  app.get('/d8v/newest', 'd8video.newest');
  app.get('/d8v/tags', 'd8video.videoTags');
  app.get('/d8v/videos', 'd8video.videoList');
  app.get('/d8v/video/:key', 'd8video.videoInfo');
  app.get('/d8v/videoPath/:id', 'd8video.videoPath');
  app.get('/d8v/test', 'd8video.test');


};
