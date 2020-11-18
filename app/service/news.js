const Service = require('egg').Service
const newsUrl = 'https://wildrift.leagueoflegends.com/page-data/zh-tw'

class NewsService extends Service {
  //获取全部新闻
  async getAllNews() {
    const data = await this.ctx.curl(`${newsUrl}/news/page-data.json`, {dataType: 'json'})
    const articles = data.data.result.data.allContentstackArticles.articles
    for (let i = 0; i < articles.length; i++) {
      let date = articles[i].date.split('-')
      articles[i].date = date[2] + '-' + date[0] + '-' + date[1]
    }
    return articles
  }

  //获取新闻详情
  async getNewsContent() {
    const url = this.ctx.request.query.url
    const data = await this.ctx.curl(`${newsUrl}/${url}/page-data.json`, {dataType: 'json', timeout: 50000})
    return data.data.result.data.contentstackArticles
  }
}

module.exports = NewsService
