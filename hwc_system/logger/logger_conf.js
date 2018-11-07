const path = require('path')
const fs = require('fs')
const category = require('./simpleTypes')

let objConfig = {
	appenders: {
		console: {
			type: 'console'
		}
	},
	replaceConsole: true,
	categories: {
		default: {
			appenders: ['console'],
			level: 'info'
		}
	}
}

const DEFAULT_PATTERN = 'yyyy-MM-dd-hh.log'

var move = true;
if(move) {
	category.forEach(c => {
		let dirPath = path.join(__dirname, `../logs/${c}`)
		if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
		let infoPath = path.join(dirPath, 'info/');
		let errorPath = path.join(dirPath, 'error/');
		['Info', 'Error'].forEach(type => {
			objConfig.appenders[`${c}${type}`] = {
				type: 'dateFile',
				pattern: DEFAULT_PATTERN,
				filename: infoPath,
				alwaysIncludePattern: true,
				category: `${c}type`
			}	
			objConfig.categories[`${c}${type}`] = {
				appenders: [`${c}${type}`, 'console'],
				level: type.toLowerCase()
			}		
		})
	})
}
module.exports = objConfig;