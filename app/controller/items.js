const Controller = require('egg').Controller

class itemController extends Controller {
  async item() {
    const info = await this.ctx.service.items.find(1)

    this.ctx.body = {
      code: 200,
      item: info,
      message: 'test'
    }
  }
}

module.exports = itemController