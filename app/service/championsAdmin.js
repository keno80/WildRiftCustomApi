const Service = require('egg').Service

class championsAdminService extends Service {
	//数据查询接口 - 包含全部查询，条件查询，分页查询
	async adminChampions() {
		const result = await this.app.mysql.select('champions', {

		})
	}
}