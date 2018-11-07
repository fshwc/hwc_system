const path = require('path')
const fs = require('fs')
const log4js = require('log4js')

const logger_conf = require('./logger_conf')


if(logger_conf.appenders) {
	for(var key in logger_conf.appenders) {
		if(logger_conf.appenders[key].filename)
			checkFile(logger_conf.appenders[key].filename)
	}
}
log4js.configure(logger_conf)

function checkFile(dir) {
	if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

module.exports = log4js;