module.exports = function(req, res, tpl) {
	let path = req.path;
	res.render(tpl, {path})
}