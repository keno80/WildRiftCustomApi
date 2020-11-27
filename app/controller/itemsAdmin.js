const Controller = require('egg').Controller

class itemAdminController extends Controller {
	async adminItems() {
		const info = await this.ctx.service.itemsAdmin.getAdminItems()

		this.ctx.body = {
			code: 200,
			data: info,
			message: '查询成功'
		}
	}

	async adminOneItem() {
		const info = await this.ctx.service.itemsAdmin.getAdminOneItem()

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

	async editItem() {
		const info = await this.ctx.service.itemsAdmin.doEditItem()

		this.ctx.body = {
			code: 200,
			message: info
		}
	}
}

module.exports = itemAdminController