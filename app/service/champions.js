const Service = require('egg').Service
const mobileUrl = 'https://wildrift.leagueoflegends.com/page-data/zh-tw/champions/ahri/page-data.json'

class ChampionsService extends Service {
  async getAllChampions() {
    return this.app.mysql.select('champions');
  }

  async getChampionData() {
    const requestId = this.ctx.request.query.id
    let result = await this.app.mysql.get('champions', {id: requestId})
    result.skinUrl = JSON.parse(result.skinUrl)
    result.passive = JSON.parse(result.passive)
    result.spells_1 = JSON.parse(result.spells_1)
    result.spells_2 = JSON.parse(result.spells_2)
    result.spells_3 = JSON.parse(result.spells_3)
    result.spells_4 = JSON.parse(result.spells_4)
    result.tags = result.tags.split(',')

    return result
  }
}

module.exports = ChampionsService
