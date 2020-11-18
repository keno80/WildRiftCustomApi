const Service = require('egg').Service

class itemService extends Service {
	async getAllItems() {
		const items = await this.app.mysql.select('items')

		for (let i = 0; i < items.length; i++) {
			items[i].type = JSON.parse(items[i].type)
		}

		return items
	}

	async findOneItem() {
		const id = this.ctx.request.query.id

		const item = await this.app.mysql.get('items', {id})
		item.type = JSON.parse(item.type)

		return item

	}
}


module.exports = itemService