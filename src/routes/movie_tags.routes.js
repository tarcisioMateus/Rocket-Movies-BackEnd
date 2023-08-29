const { Router } = require('express')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const MovieTagsController = require('../controllers/MovieTagsController')
const movieTagsController = new MovieTagsController()

const movieTagsRoutes = Router()

movieTagsRoutes.get('/', ensureAuthenticated, movieTagsController.index)

module.exports = movieTagsRoutes