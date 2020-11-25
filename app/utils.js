const fs = require('fs')

//获取本地已存在的英雄目录
function check_exist() {
	let localDir = []
	const parentDir = fs.readdirSync('./app/public/champions')
	parentDir.forEach((item, index) => {
		let stat = fs.lstatSync('./app/public/champions/' + item)
		if (stat.isDirectory() === true) {
			localDir.push(item)
		}
	})
	return localDir
}

//判断本地存在的英雄是否与远程服务器相符
function check_local(serverData) {
	let obj = {list: []}
	// console.log(serverData);
	for (let i = 0; i < serverData.length; i++) {
		let name = serverData[i].image.title.split('_')[0].toUpperCase()
		if (check_exist().toString().toUpperCase().indexOf(name) === -1) {
			let o = {
				name,
				url: serverData[i].url.url
			}
			obj.list.push(o)
		}
	}
	return obj
}

//获取每个英雄的皮肤数据,与远程服务器比较
async function check_champions_skin(champion, serverData, mobileUrl, ctx) {
	console.log(`当前检查${champion}`);
	let skins = []
	for (let i = 0; i < serverData.length; i++) {
		let name = serverData[i].image.title.split('_')[0].toUpperCase()
		let url = serverData[i].url.url
		if (champion.toUpperCase() === name) {
			const championSkinsJson = await ctx.curl(`${mobileUrl}${url}page-data.json`, {dataType: 'json', timeout: 100000})
			const championsSkins = championSkinsJson.data.result.data.allContentstackChampionDetail.nodes[0].skins
			const localSkins = JSON.stringify(fs.readdirSync(`./app/public/champions/${champion}`))
			for (let j = 0; j < championsSkins.length; j++) {
				if (localSkins.indexOf(`${championsSkins[j].splash.title}`) === -1) {
					console.log(`缺失以下皮肤数据: ${championsSkins[j].splash.title}, 下载中...`);
					const res = await ctx.curl(championsSkins[j].splash.url, {dataType: 'arraybuffer', timeout: 100000})
					const skinsDir = `./app/public/champions/${champion}/${championsSkins[j].splash.title}`
					let ws = fs.createWriteStream(skinsDir)
					const err = await ws.write(res.data)
					if (err) {
						console.log(err);
					} else {
						console.log(`皮肤: ${championsSkins[j].splash.title}下载成功`);
						skins.push(`https://wr.chkai.xyz/public/champions/${champion}/${championsSkins[j].splash.title}`)
					}
				}
			}
		}
	}
	return skins
}

async function championsSQL(champion, clientChampion, row, ctx) {
	// console.log(row);
	const result = await ctx.curl(`${clientChampion}/${champion}.json`, {dataType: 'json', timeout: 100000})
	const spells = result.data.data[champion].spells
	let spell = []
	for (let i = 0; i < spells.length; i++) {
		spell.push(
			{
				id: spells[i].id,
				name: spells[i].name,
				description: spells[i].description
			}
		)
	}
	row.spells = JSON.stringify(spell)
	row.passive = JSON.stringify({
		name: result.data.data[champion].passive.name,
		description: result.data.data[champion].passive.description,
		image: result.data.data[champion].passive.image.full
	})
	console.log(row);
	// const info = await ctx.app.mysql.get('champions', {name: `${champion}`})
	// const id = await ctx.app.mysql.count('champions')
	// let row = {
	// 	id: id + 1,
	// 	name: clientResponse.data.data[clientChampionsName[i]].title,
	// 	imgUrl: `${championsImg}${clientResponse.data.data[clientChampionsName[i]].id}.png`,
	// 	skinUrl: JSON.stringify(skinArray)
	// }
	return await ctx.app.mysql.insert('champions', row)

}

const utils = {
	check_exist,
	check_local,
	check_champions_skin,
	championsSQL
}

module.exports = utils