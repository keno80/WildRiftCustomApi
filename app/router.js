module.exports = app => {
  const {router, controller} = app
  router.get('/champions/all', controller.champions.allChampions)
  router.get('/champion', controller.champions.champion)
  router.get('/news', controller.news.list)
  router.get('/news/content', controller.news.content)
  router.get('/item', controller.items.allItems)
  router.get('/item/info', controller.items.oneItem)
  router.get('/item/filter', controller.items.typeFilter)
  router.get('/item/name', controller.items.nameFilter)

  //后台装备接口
  router.post('/admin/items/:page/:size', controller.itemsAdmin.adminItems)
  router.post('/admin/item', controller.itemsAdmin.adminOneItem)
  router.post('/admin/item/add', controller.itemsAdmin.addItem)
  router.post('/admin/item/edit', controller.itemsAdmin.editItem)

  //后台英雄接口
  router.post('/admin/champions/:page/:size', controller.championsAdmin.adminChampions)
  router.post('/admin/champion', controller.championsAdmin.adminOneChampion)
  router.post('/admin/champion/edit', controller.championsAdmin.editChampion)

  //天赋接口
  router.get('/runes/main', controller.runes.mainKeystone)
  router.get('/runes/deputy', controller.runes.deputyKeystone)

  //召唤师技能接口
  router.get('/summoner/spells', controller.summonerSpells.summonerSpells)
}

