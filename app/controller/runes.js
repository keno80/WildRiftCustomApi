const Controller = require('egg').Controller

class runesController extends Controller {
	async mainKeystone() {
		const info = await this.ctx.service.runes.getMainKeystone()

		this.ctx.body = {
			code: 200,
			runes: info,
			message: '数据请求成功'
		}
	}

	async deputyKeystone() {
		const info = await this.ctx.service.runes.getDeputyKeystone()

		this.ctx.body = {
			code: 200,
			runes: info,
			message: '数据请求成功'
		}
	}
}

module.exports = runesController