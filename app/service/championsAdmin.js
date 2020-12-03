const Service = require('egg').Service

class championsAdminService extends Service {
	//数据查询接口 - 包含全部查询，条件查询，分页查询
	async getAdminChampions() {
		const {page, size} = this.ctx.params
		const reqBody = this.ctx.request.body

		let sql = `SELECT * FROM champions WHERE NAME like '%${reqBody.name}%' AND nickname LIKE '%${reqBody.nickname}%' LIMIT ${page * size - size}, ${size}`

		const result = await this.app.mysql.query(sql);
		const total = await this.app.mysql.count('champions')

		for (let i = 0; i < result.length; i++) {
			result[i].skinUrl = JSON.parse(result[i].skinUrl)
			result[i].spells = JSON.parse(result[i].spells)
			result[i].tags = result[i].tags.split(',')
		}

		return {
			result,
			total
		}
	}

	//单个查询接口
	async getAdminOneChampion() {
		const id = this.ctx.request.body.id

		const result = await this.app.mysql.get('champions', {id})

		result.spells = JSON.parse(result.spells)
		result.tags = result.tags.split(',')

		return result
	}

	//修改接口
	async doEditChampion() {
		const reqBody = this.ctx.request.body
		console.log(reqBody);

		const result = await this.app.mysql.update('champions', reqBody)

		if (result.affectedRows === 1) {
			return '修改成功'
		}
	}
}

module.exports = championsAdminService