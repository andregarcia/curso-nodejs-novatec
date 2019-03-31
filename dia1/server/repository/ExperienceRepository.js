
const db = require('../config/mongo')

const ExperienceRepository = {

	list(callback) {
		db.collection('experiences').find({}, (err, data) => {
			callback(err, data)
		})
	},

	byId(id, callback) {
		let _id = db.ObjectId(id)
		db.collection('experiences').findOne({_id: _id}, callback)
	},

	create(body, callback) {
		db.collection('experiences').insert(body, callback)
	},

	update(id, body, callback) {
		let _id = db.ObjectId(id)
		let query = {_id: _id }
		db.collection('experiences').update(query, { $set: body }, callback)
	},

	delete(id, callback) {
		let _id = db.ObjectId(id)
		let query = {_id: _id }
		db.collection('experiences').remove(query, callback)	
	}
}

module.exports = ExperienceRepository

