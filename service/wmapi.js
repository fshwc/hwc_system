const Base = require('./Base')
const conf = require('../conf/conf')
class systemA extends Base {
	constructor() {
		super('systemA')
	}
	_requestFilter(opts) {
		opts.qs = opts.qs || {};
		var key = conf.systemA_key;
		var time = new Date().getTime()
		var _sign = md5(key+time)
		opts.qs._sign = sign;
		opts.qs.ts = time
	}
}

mudole.exports = systemA