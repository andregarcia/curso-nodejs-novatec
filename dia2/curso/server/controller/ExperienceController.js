// server/controller/ExperienceController.js

const repository = require('../repository/ExperienceRepository')
const redis = require('../config/redis')


const ExperienceController = {
	list(request, response, next) {
		repository.listAsync()
			.then(data => {
				redis.setAsync('agarcia:list', JSON.stringify(data))
					.catch(err => console.log(err))
				console.log('list from database')
				response.json(data)
			})
			.catch(next)
	},

	listFromCache(request, response, next) {
		redis.getAsync('agarcia:list')
			.then(result => {
				if(!result) return next()

				let data = JSON.parse(result);
				console.log('list from cache')
				response.json(data)
			})
			.catch(err => next())
	},

	byId(request, response, next) {
		const id = request.params.id
		repository.byIdAsync(id)
			.then(data => {
				if(!data) {
					let notFound = new Error('XP not found')
					notFound.status = 404
					return next(notFound)
				}
				response.json(data)
			})
			.catch(next)
	},
	create(request, response, next) {
		const body = request.body
		repository.createAsync(body)
			.then(data =>{
				response.status(201).json(data)
			})
			.catch(next)
	},
	update(request, response, next) {
		const id = request.params.id
		const body = request.body
		repository.updateAsync(id, body)
			.then(data => {
				response.json(data)
			})
			.catch(next)
	},
	delete(request, response, next) {
		const id = request.params.id
		repository.deleteAsync(id)
			.then(data => {
				response.status(204).json(data);
			})
			.catch(next)
	},

	validateId(request, response, next) {
		const id = request.params.id
		if(id.length !== 24) {
			let err = new Error('invalid id')
			err.status = 422
			return next(err)
		}
		next()
	}
}

module.exports = ExperienceController
