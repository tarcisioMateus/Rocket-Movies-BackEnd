const { Router } = require('express')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


const MovieNotesController = require('../controllers/MovieNotesController')
const movieNotesController = new MovieNotesController()

const movieNotesRoutes = Router()

movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.post('/', movieNotesController.create)
movieNotesRoutes.get('/:id', movieNotesController.show)
movieNotesRoutes.get('/', movieNotesController.index)
movieNotesRoutes.delete('/:id', movieNotesController.delete)

module.exports = movieNotesRoutes