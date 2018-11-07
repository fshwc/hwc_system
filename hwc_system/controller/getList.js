module.exports = function(req, res) {
	let data = [{name: 'Tom', age: '18'},{name: 'Kitty', age: '23'}]
	req.wmapiInfo.info(data)
	res.json(data)
}