const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()

let view = [];
let apis = []

let dir = path.join(__dirname, '../router')
let list = fs.readdirSync(dir)
if(list) {
	list.forEach(files => {
		var file = require(path.join(__dirname, '../router/'+files))
		if(file.view) view = view.concat(file.view)
		if(file.apis) apis = apis.concat(file.apis)
	})
}


function applyController(fnPath, req, res, ...args) {
	var fn  = require(path.join(__dirname, '../controller/'+fnPath))
	if(fn) fn(req, res, ...args);
}

function checkPerm(perm, cb) => {
	if(perm) {
		//检查是否通过权限，通过才执行cb
		cb(true)
		//缺少权限
		//cb(null)
	}
}

if(view && view.length) {
	view.forEach(m => {
		router.get(m.path, (req, res) => {
			if(m.view && m.view[0] == '/') m.view = m.view.substr(1)
			applyController(m.controller, req, res, m.view)
		})
	})
}

if(apis && apis.length) {
	apis.forEach(m => {
		router[m.method](m.path, (req, res) => {
			if(m.perm) {
				checkPerm(m.perm, (hasPerm) => {
					if(hasPerm) {
						applyController(m.controller, req, res)
					}else {
						res.json({error: {msg: '缺少权限'}})
					}
				})
				
			}else {
				applyController(m.controller, req, res)
			}
		})
	})
}

module.exports = function() {
	return router
}
