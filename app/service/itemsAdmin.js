const Service = require('egg').Service

class itemAdminService extends Service {
	//数据查询接口 - 包含全部查询，条件查询，分页查询
	async getAdminItems() {
		const {page, size} = this.ctx.params
		const reqBody = this.ctx.request.body

		let sql = `SELECT * FROM items WHERE NAME like '%${reqBody.name}%' AND type LIKE '%${reqBody.type}%' LIMIT ${page * size - size}, ${size}`

		const result = await this.app.mysql.query(sql);
		const total = await this.app.mysql.count('items')

		for (let i = 0; i < result.length; i++) {
			result[i].type = JSON.parse(result[i].type)
			result[i].recipe = JSON.parse(result[i].recipe)
			result[i].builds = JSON.parse(result[i].builds)
		}

		return {
			result,
			total
		}
	}

	//单个查询接口
	async getAdminOneItem() {
		const id = this.ctx.request.body.id

		const result = await this.app.mysql.get('items', {id})

		result.type = JSON.parse(result.type)
		result.recipe = JSON.parse(result.recipe)
		result.builds = JSON.parse(result.builds)

		return result
	}

	//新增接口
	async doAddItem() {
		const reqBody = this.ctx.request.body
		console.log(reqBody);

		const result = await this.app.mysql.insert('items', reqBody)

		if (result.affectedRows === 1) {
			return '新增装备成功'
		}
	}

	//修改接口
	async doEditItem() {
		const reqBody = this.ctx.request.body
		console.log(reqBody);

		const result = await this.app.mysql.update('items', reqBody)

		if (result.affectedRows === 1) {
			return '新增修改成功'
		}
	}
}

module.exports = itemAdminService