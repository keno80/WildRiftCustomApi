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
		if (item.passive !== null) {
			item.passive = item.passive.split('。')
		}

		if (item.recipe !== null) {
			item.recipe = JSON.parse(item.recipe)
		}

		if (item.builds !== null) {
			item.builds = JSON.parse(item.builds)
		}

		return item
	}

	async doTypeFilter() {
		const type = this.ctx.request.query.type
		let queryInfo = []
		if (type === "全部装备") {
			queryInfo = await this.app.mysql.select('items')
		} else{
			queryInfo = await this.app.mysql.query(`SELECT * FROM items WHERE type like '%${type}%'`)
		}

		for (let i = 0; i < queryInfo.length; i++) {
			queryInfo[i].type = JSON.parse(queryInfo[i].type)
		}

		return queryInfo
	}

	async doNameFilter() {
		const name = this.ctx.request.query.name
		const queryInfo = await this.app.mysql.query(`SELECT * FROM items WHERE name like '%${name}%'`)

		for (let i = 0; i < queryInfo.length; i++) {
			queryInfo[i].type = JSON.parse(queryInfo[i].type)
		}

		return queryInfo
	}
}


module.exports = itemService