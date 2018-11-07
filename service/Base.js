const request = require('request')
const log4js = require('../logger/logger')

module.exports = class Base {
	constructor(id) {
		this.id = id;
	}

	request(opts, cb) {
		let infoLogger = log4js.getLogger(`${this.id}-info`)
		let errorLogger = log4js.getLogger(`${this.id}-error`)

		opts = this._requestFilter(opts)//  各个系统鉴权

		let body = JSON.stringify(opts)
		infoLogger.info(body)
		/*request(opts, (err, res, body) => {
			if(err) errorLogger.error(JSON.stringify(err))
			else if(body && body.error) errorLogger.error(JSON.stringify(body.error))
			else cb(err, body)
		})*/
	}

	_requestFilter(opts) {
		return JSON.parse(JSON.stringify(opts))
	}
}