const Controller = require('egg').Controller

class championsAdminController extends Controller {
	async adminChampions() {
		const info = await this.ctx.service.championsAdmin.getAdminChampions()

		this.ctx.body = {
			code: 200,
			data: info,
			message: '查询成功'
		}
	}

	async adminOneChampion() {
		const info = await this.ctx.service.championsAdmin.getAdminOneChampion()

		this.ctx.body = {
			code: 200,
			data: info,
			message: '查询成功'
		}
	}

	async addItem() {
		const info = await this.ctx.service.itemsAdmin.doAddItem()

		this.ctx.body = {
			code: 200,
			message: info
		}
	}

	async editChampion() {
		const info = await this.ctx.service.championsAdmin.doEditChampion()

		this.ctx.body = {
			code: 200,
			message: info
		}
	}
}

module.exports = championsAdminController