// route/index.js
const AppController = require('../controller/AppController')
const XPController = require('../controller/ExperienceController')
const router = require('express').Router()

router.get('/', AppController.index)

router.get('/experiences', XPController.list)

router.post('/experiences', XPController.create)

router.use('/experiences/:id', XPController.validateId)
router.get('/experiences/:id', XPController.byId)
router.put('/experiences/:id', XPController.update)
router.delete('/experiences/:id', XPController.delete)

module.exports = router
