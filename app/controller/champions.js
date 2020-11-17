const Controller = require('egg').Controller

class ChampionsController extends Controller {
  async allChampions() {
    const data = await this.ctx.service.champions.getAllChampions()
    this.ctx.body = {
      code: 200,
      champions: data,
      message: 'test'
    }
  }

  async champion() {
    const data = await this.ctx.service.champions.getChampionData()
    this.ctx.body = {
      code: 200,
      data,
      message: '数据请求成功'
    }
  }
}

module.exports = ChampionsController
