const Service = require('egg').Service
const py = require('js-pinyin')
const ClientUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/data/zh_CN/champion'
const ClientChampionImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion'
const ClientChampionSpellImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/spell'
const ClientChampionPassiveImgUrl = 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/passive'
const MobileUrl = 'https://wildrift.leagueoflegends.com/page-data/zh-tw/champions'

class ChampionsService extends Service {
  async getAllChampions() {
    const data = await this.ctx.curl(`${MobileUrl}/page-data.json`, {dataType: 'json', timeout: 50000})
    const ClientName = ['AurelionSol', 'DrMundo', 'JarvanIV', 'LeeSin', 'MasterYi', 'MissFortune', 'TwistedFate', 'XinZhao']
    const championsList = data.data.result.data.allContentstackChampions.nodes[0].championList
    let index = 0

    for (let j = 0; j < championsList.length;) {
      if (index === ClientName.length) {
        championsList[j].image.url = `${ClientChampionImgUrl}/${championsList[j].image.title.split('_')[0].substring(0, 1).toUpperCase() + championsList[j].image.title.split('_')[0].substring(1)}.png`
        j++
      } else {
        for (let i = 0; index < ClientName.length;) {
          if (ClientName[index].toUpperCase() === championsList[j].image.title.split('_')[0].toUpperCase()) {
            championsList[j].image.url = `${ClientChampionImgUrl}/${ClientName[index]}.png`
            index < ClientName.length ? index++ : index = ClientName.length
            j++
          } else {
            championsList[j].image.url = `${ClientChampionImgUrl}/${championsList[j].image.title.split('_')[0].substring(0, 1).toUpperCase() + championsList[j].image.title.split('_')[0].substring(1)}.png`
            j++
          }
        }
      }
    }

    return championsList
  }

  async getChampionData() {
    const requestUrl = this.ctx.request.query.url.split('/')[2]
    const data = await this.ctx.curl(`${MobileUrl}/${requestUrl}/page-data.json`, {
      dataType: 'json',
      timeout: 50000
    })

    const championData = data.data.result.data.allContentstackChampionDetail.nodes[0]
    return {
      title: championData.title,
      subtitle: championData.subtitle,
      roles: championData.roles,
      difficulty: championData.difficulty,
      abilities: championData.abilities,
      skins: championData.skins,
    }
  }
}

module.exports = ChampionsService
