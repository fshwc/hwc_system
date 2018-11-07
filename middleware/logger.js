const log4js = require('../logger/logger')
const simpleTypes = require('../logger/simpleTypes')

module.exports = function(req) {
	simpleTypes.forEach(system => {
		['Info', 'Error'].forEach(type => {
			var log = `${system}${type}`
			req[log] = log4js.getLogger(log)
		})
	})
}