const Service = require('egg').Service

class summonerSpellsService extends Service {
	async getSummonerSpells() {
		return this.app.mysql.select('summoner_spells');
	}
}

module.exports = summonerSpellsService