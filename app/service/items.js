const Service = require('egg').Service
const path = require('path')
const fs = require('fs')

class itemService extends Service {
	async find(id) {
		// const item = await this.app.mysql.get('items', {id})
		// console.log(item);
	}
}


module.exports = itemService