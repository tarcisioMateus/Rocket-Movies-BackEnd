const { Router } = require('express')

const usersRoutes = require('./users.routes')
const movieNotesRoutes = require('./movie_notes.routes')
const movieTagsRoutes = require('./movie_tags.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/movienotes', movieNotesRoutes)
routes.use('/movietags', movieTagsRoutes)

module.exports = routes