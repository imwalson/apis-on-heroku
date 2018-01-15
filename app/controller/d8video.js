'use strict';
const fs = require('fs');
const axios = require('axios');

module.exports = app => {
  class D8videoController extends app.Controller {
    async newest() {
      const page = this.ctx.query.page || '1';
      const per_page = this.ctx.query.per_page || '10';

      const res = await this.ctx.service.d8video.newstVideos({
        page: page,
        per_page: per_page
      });
      this.ctx.body = res;
    }

    async videoTags() {
      const res = await this.ctx.service.d8video.videoTags();
      this.ctx.body = res;
    }

    async videoList() {
      const page = this.ctx.query.page || '1';
      const per_page = this.ctx.query.per_page || '10';
      const tag_name = this.ctx.query.tag_name || '';
      const keyword = this.ctx.query.keyword || '';

      const res = await this.ctx.service.d8video.videoList({
        page: page,
        per_page: per_page,
        tag_name: tag_name,
        keyword: keyword
      });
      this.ctx.body = res;
    }

    async videoInfo() {
      const key = this.ctx.params.key || '';

      const res = await this.ctx.service.d8video.videoInfo(key);
      this.ctx.body = res;
    }

    async videoPath() {
      const id = this.ctx.params.id || '';

      const res = await this.ctx.service.d8video.videoPath(id);
      this.ctx.body = res;
    }

  }

  return D8videoController;
};
