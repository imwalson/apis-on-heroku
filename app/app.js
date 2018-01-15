
module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    // preload before app start
    await ctx.service.posts.load();
  });
  ctx.logger.debug('server running at: ' + app.config.cluster.listen.hostname + ':' + app.config.cluster.listen.port );

};