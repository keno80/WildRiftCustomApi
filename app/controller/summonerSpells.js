const Controller = require('egg').Controller

class summonerSpellsController extends Controller {
	async summonerSpells() {
		const info = await this.ctx.service.summonerSpells.getSummonerSpells()

		this.ctx.body = {
			code: 200,
			spells: info,
			message: '数据请求成功'
		}
	}
}

module.exports = summonerSpellsController