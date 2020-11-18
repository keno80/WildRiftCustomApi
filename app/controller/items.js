const Controller = require('egg').Controller

class itemController extends Controller {
  async allItems() {
    const info = await this.ctx.service.items.getAllItems()

    this.ctx.body = {
      code: 200,
      item: info,
      message: '获取装备列表成功'
    }
  }

  async oneItem() {
    const itemInfo = await this.ctx.service.items.findOneItem()

    this.ctx.body = {
    code: 200,
      itemInfo,
      message: '获取装备信息成功'
    }
  }

}

module.exports = itemController