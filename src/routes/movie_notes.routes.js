const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController')
const movieNotesController = new MovieNotesController()

const movieNotesRoutes = Router()

movieNotesRoutes.post('/:user_id', movieNotesController.create)
movieNotesRoutes.get('/show/:id', movieNotesController.show)
movieNotesRoutes.get('/:user_id', movieNotesController.index)
movieNotesRoutes.delete('/:id', movieNotesController.delete)

module.exports = movieNotesRoutes