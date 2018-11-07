module.exports = {
	view: [
		{
			path:'/home',
			controller: '/home',
			view: '/home.html'
		}
	],
	apis: [
		{
			path:'/getList',
			method: 'get',
			controller: '/getList',
			role: ['perm1', 'perm2'],
			desc: '拿数据列表',
		}
	]
}