const Controller = require('egg').Controller

class NewsController extends Controller {
  async list() {
    const data = await this.ctx.service.news.getAllNews()
    this.ctx.body = {
      code: 200,
      message: '新闻获取成功',
      articles: data
    }
  }

  async content() {
    const data = await this.ctx.service.news.getNewsContent()
    this.ctx.body = {
      code: 200,
      message: '新闻详情获取成功',
      article: data
    }
  }
}

module.exports = NewsController
