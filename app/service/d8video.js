// D8Video 视频接口相关
const Service = require('egg').Service;
const axios = require('axios');

// const HOST = 'email.d8dizhi.at.gmail.com.d8-app.space';
// const baseURL = 'http://email.d8dizhi.at.gmail.com.d8-app.space';
// const videoUrlBase = 'http://email.d8dizhi.at.gmail.com.8spd.space';
// const apiMap = {
//   newest: '/api/v2/videos/latest', // 最新视频
//   videoTags: '/api/v2/tags/alphabet', // 视频标签列表
//   videoList: '/api/v2/videos',  // 视频列表
//   videoInfo: '/api/v2/video/', // 视频详情
//   videoPath: '/v/video_v_href/' // 获取视频文件地址
// }


// 生成随机 fingerprint
function fingerprintGenerater() {
  const len = 17;
  const prefix = 'fingerprintkey-';
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
  var maxPos = $chars.length;
  var pwd = '';
　for (let i = 0; i < len; i++) {
　  pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　}
　return prefix + pwd;
}

// Stert Service
class D8videoService extends Service {
  constructor(ctx) {
    super(ctx); 

    this.HOST = this.app.config.d8video.HOST;
    this.baseURL = this.app.config.d8video.baseURL;
    this.videoUrlBase = this.app.config.d8video.videoUrlBase;
    this.apiMap = this.app.config.d8video.apiMap;
    /*创建 axios 实例*/
    this.request = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Cookie': '',
        'Host': this.HOST,
        'Referer': this.baseURL,
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
      }
    });
  }

  // 最新视频
  async newstVideos(options) {
    var op = options || {};
    var page = op.page || '1';
    var per_page = op.per_page || '10';
    try {
      var res = await this.request.get(this.apiMap.newest,{
        params: {
          page: page,
          per_page: per_page
        }
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log("error.response.data",error.response.data);
      } else if (error.request) {
        console.log("error.request",error.request);
      } else {
        console.log('Error', error.message);
      }
      return {
        "error": {
            "code": 1,
            "server": "失败",
            "client": "获取失败"
        },
        "data": {}
      }
    } 
  }

  // 视频标签列表
  async videoTags() {
    try {
      var res = await this.request.get(this.apiMap.videoTags);
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log("error.response.data",error.response.data);
      } else if (error.request) {
        console.log("error.request",error.request);
      } else {
        console.log('Error', error.message);
      }
      return {
        "error": {
            "code": 1,
            "server": "失败",
            "client": "获取失败"
        },
        "data": {}
      }
    } 
  }

  // 视频列表
  async videoList(options) {
    var op = options || {};
    var page = op.page || '1';
    var per_page = op.per_page || '10';
    var keyword = op.keyword || '';
    var tag_name = op.tag_name || '';

    try {
      var res = await this.request.get(this.apiMap.newest,{
        params: {
          page: page,
          per_page: per_page,
          tag_name: tag_name,
          title: keyword
        }
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log("error.response.data",error.response.data);
      } else if (error.request) {
        console.log("error.request",error.request);
      } else {
        console.log('Error', error.message);
      }
      return {
        "error": {
            "code": 1,
            "server": "失败",
            "client": "获取失败"
        },
        "data": {}
      }
    } 
  }

  // 视频详情
  async videoInfo(key) {
    var key = key || '';
    try {
      var res = await this.request.get(this.apiMap.videoInfo + key);
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log("error.response.data",error.response.data);
      } else if (error.request) {
        console.log("error.request",error.request);
      } else {
        console.log('Error', error.message);
      }
      return {
        "error": {
            "code": 1,
            "server": "失败",
            "client": "获取失败"
        },
        "data": {}
      }
    } 
  }

  // 视频文件 path
  async videoPath(id) {
    var id = id || '';

    try {
      var res = await axios.get(this.videoUrlBase + this.apiMap.videoPath + id,{
        params: {
          flag: '0',
          d: '2',
          fingerprint: fingerprintGenerater()
        },
        headers: {
          'Cookie': '',
          //'Host': HOST,
          'Referer': this.baseURL,
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        }
      });
      return res.data;
    } catch (error) {
      console.log(error.request);
      if (error.response) {
        console.log("error.response.data",error.response.data);
      } else if (error.request) {
        console.log("error.request",error.request);
      } else {
        console.log('Error', error.message);
      }
      return { "result": false,"data": {} }
    } 
  }


}

module.exports = D8videoService;