const Controller = require('egg').Controller

class itemController extends Controller {
  async item() {
    const info = await this.ctx.service.items.find(1)
  }
}

module.exports = itemController