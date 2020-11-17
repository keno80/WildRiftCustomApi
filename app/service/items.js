const Service = require('egg').Service

class itemService extends Service {
  async find(id) {
    const item = await this.app.mysql.get('items', {id})
    console.log(item);
  }
}

module.exports = itemService