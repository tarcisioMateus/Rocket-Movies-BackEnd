const { Router } = require('express')

const SessionsController = require('../controllers/SessionsController')
const sessionsController = new SessionsController()

const sessiosRoutes = Router()

sessiosRoutes.get('/', sessionsController.create)

module.exports = sessiosRoutes