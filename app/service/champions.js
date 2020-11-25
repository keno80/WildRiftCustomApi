const Service = require('egg').Service
const ClientUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/data/zh_CN/champion'
const ClientChampionImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion'
const ClientChampionSpellImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell'
const ClientChampionPassiveImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/passive'

class ChampionsService extends Service {
  async getAllChampions() {
    return this.app.mysql.select('champions');
  }

  async getChampionData() {
    const requestId = this.ctx.request.query.id
    let result = await this.app.mysql.get('champions', {id: requestId})
    result.skinUrl = JSON.parse(result.skinUrl)
    result.spells = JSON.parse(result.spells)
    result.tags = result.tags.split(',')
    result.passive = JSON.parse(result.passive)

    return result
  }
}

module.exports = ChampionsService
