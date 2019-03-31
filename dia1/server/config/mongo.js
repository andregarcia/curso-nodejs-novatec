

const mongojs = require('mongojs')
const db = mongojs('localhost:27017/cursonode')

db.on('error', () => {
	console.log('caiuuuu', err)
})

module.exports = db

