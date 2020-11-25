const Controller = require('egg').Controller

class ChampionsController extends Controller {
  async allChampions() {
    const data = await this.ctx.service.champions.getAllChampions()
    this.ctx.body = {
      code: 200,
      champions: data,
      message: '数据请求成功'
    }
  }

  async champion() {
    const data = await this.ctx.service.champions.getChampionData()
    this.ctx.body = {
      code: 200,
      champion: data,
      message: '数据请求成功'
    }
  }
}

module.exports = ChampionsController
