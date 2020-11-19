module.exports = app => {
  const {router, controller} = app
  router.get('/champions/all', controller.champions.allChampions)
  router.get('/champion', controller.champions.champion)
  router.get('/news', controller.news.list)
  router.get('/news/content', controller.news.content)
  router.get('/item', controller.items.allItems)
  router.get('/item/info', controller.items.oneItem)
  router.get('/item/filter', controller.items.typeFilter)
}

