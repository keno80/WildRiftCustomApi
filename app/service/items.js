const Service = require('egg').Service

class itemService extends Service {
	async getAllItems() {
		const item = await this.app.mysql.select('items')

		for (let i = 0; i < item.length; i++) {
			item[i].type = JSON.parse(item[i].type)
		}

		return item
	}
}


module.exports = itemService