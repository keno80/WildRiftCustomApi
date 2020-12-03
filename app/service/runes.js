const Service = require('egg').Service

class runesService extends Service {
	async getMainKeystone() {
		const res = await this.app.mysql.select('runes', {
			where: {type: 'Main'}
		})

		for (let i = 0; i < res.length; i++) {
			if (res[i].effect !== null) {
				res[i].effect = JSON.parse(res[i].effect)
			}
		}

		return res
	}

	async getDeputyKeystone() {
		const type = this.ctx.request.query.type

		const res = await this.app.mysql.select('runes', {
			where: {type}
		})
		
		for (let i = 0; i < res.length; i++) {
			if (res[i].effect !== null) {
				res[i].effect = JSON.parse(res[i].effect)
			}
		}

		return res
	}
}

module.exports = runesService