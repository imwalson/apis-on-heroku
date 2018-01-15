module.exports = (options, app) => {
  return async function clientMiddleware(ctx,next) {

    //clientType
    const ua = (ctx.get('user-agent') || '').toLowerCase();
    let clientType = '';

    if(ua.match('micromessenger')) {
      clientType = 'wechat_web';

    } else if(ua.match('android|phone')) {
      if(ua.match('mobile')) {
        clientType = 'web_phone';
      } else {
        clientType = 'web_pad';
      }

    } else if(ua.match('ipad')) {
        clientType = 'web_pad';

    } else if(ua.match('mobile|iphone')) {
      clientType = 'web_phone';

    } else {
      clientType = 'web_pc';
    }

    ctx.headers.clienttype = clientType;

    //clientId
    let clientId = ctx.cookies.get('clientId', {signed: false}) || ctx.get('clientId');
    if(!clientId) {
      const uuid = require('uuid/v1');
      clientId = uuid().replace(/-/g, '');
      ctx.cookies.set('clientId', clientId, {
        expires: new Date(2100, 1, 1, 0, 0, 0),
        httpOnly: false,
        signed: false
      });
    }
    ctx.headers.clientid = clientId;

    //accessToken
    let accessToken = ctx.cookies.get('accessToken', {signed: false});
    if(accessToken) {
      ctx.headers.accesstoken = accessToken;
    }

    await next();
  }
};
