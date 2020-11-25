const clientChampions = 'http://ddragon.leagueoflegends.com/cdn/10.24.1/data/zh_CN/champion.json'
const clientChampion = 'http://ddragon.leagueoflegends.com/cdn/10.24.1/data/zh_CN/champion'
const championsImg = 'https://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/'
const mobileUrl = 'https://wildrift.leagueoflegends.com/page-data/zh-tw'
const fs = require('fs')
const path = require('path')
const utils = require('../utils')

module.exports = {
	schedule: {
		// cron: '10 * * * * *',
		disable: true,
		interval: '3h',
		type: 'all',
		immediate: 'true'
	},
	async task(ctx) {
		const mobileResponse = await ctx.curl(`${mobileUrl}/champions/page-data.json`, {dataType: 'json', timeout: 100000})
		const mobileData = mobileResponse.data.result.data.allContentstackChampions.nodes[0].championList

		// //获取端游的英雄名
		const clientResponse = await ctx.curl(`${clientChampions}`, {dataType: 'json', timeout: 100000})
		const clientChampionsName = Object.keys(clientResponse.data.data)
		//

		//判断本地是否存在的英雄皮肤数据以及是否与远程服务器相符
		console.log('开始检查本地英雄数据是否与服务器相同');
		const noneExistData = await utils.check_local(mobileData)
		if (noneExistData.list.length !== 0) {
			for (let i = 0; i < clientChampionsName.length; i++) {
				console.log('本地数据与服务器不相同,正在更新数据');
				//如果本地存在的数据长度不为0,则表示有未下载的皮肤数据
				for (let j = 0; j < noneExistData.list.length; j++) {
					let name = noneExistData.list[j].name
					if (name === clientChampionsName[i].toUpperCase()) {
						//创建英雄皮肤文件夹
						fs.mkdir(`./app/public/champions/${clientResponse.data.data[clientChampionsName[i]].id}`, function (err) {
							err ? console.log(err) : console.log(`目录：${clientResponse.data.data[clientChampionsName[i]].id}创建成功`)
						})
					}
				}
			}
		} else {
			console.log('本地英雄数据与服务器相同')
		}

		//检查本地皮肤数据是否与远程服务器相同
		console.log('开始检查本地英雄数据是否与服务器相同');
		const noneExistSkins = utils.check_exist()
		if (noneExistSkins.length !== 0) {
			// console.log(noneExistSkins);
			for (let i = 0; i < clientChampionsName.length; i++) {
				for (let j = 0; j < noneExistSkins.length; j++) {
					if (noneExistSkins[j].toUpperCase() === clientChampionsName[i].toUpperCase()) {
						const newSkins = await utils.check_champions_skin(noneExistSkins[j], mobileData, mobileUrl, ctx)
						if (newSkins.length !== 0) {
							// console.log(newSkins);
							let row = {
								id: j + 1,
								title: noneExistSkins[j],
								name: `${clientResponse.data.data[clientChampionsName[i]].title}`,
								nickname: `${clientResponse.data.data[clientChampionsName[i]].name}`,
								tags: `${clientResponse.data.data[clientChampionsName[i]].tags}`,
								imgUrl: `${championsImg}${clientResponse.data.data[clientChampionsName[i]].image.full}`,
								skinUrl: JSON.stringify(newSkins)
							}
							const result = await utils.championsSQL(noneExistSkins[j], clientChampion, row, ctx)
							result.affectedRows === 1 ? console.log('数据新增成功') : console.log('数据新增失败')
						}
					}
				}
			}
		} else {
			console.log('本地英雄皮肤数据与服务器相同')
		}
	}
}