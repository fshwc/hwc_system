const path = require('path')
const express = require('express')
const ejs = require('ejs')
const app = express()

const middleware = [
	{path: './middleware/logger', name: 'logger'},
	{path: './middleware/router', name: 'router'},
]

middleware.forEach(function(m) {
	middleware.__defineGetter__(m.name, function() {
		return require(m.path)
	})
})

app.set('name', 'hwc')
app.use(express.static('view'));
app.set('views', path.join(__dirname, 'view/'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')


app.use('*', function(req, res, next) {
	middleware.logger(req) //req挂载
	next()
})

app.use(middleware.router());  //初始化路由

app.all('*', function(req, res) {
	res.json({error: {msg: 'no found'}})
})

app.listen('8000', () => {
	console.log(3)
})