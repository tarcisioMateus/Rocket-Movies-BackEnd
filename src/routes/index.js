const { Router } = require('express')

const usersRoutes = require('./users.routes')
const movieNotesRoutes = require('./movie_notes.routes')
const movieTagsRoutes = require('./movie_tags.routes')
const sessiosRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/movienotes', movieNotesRoutes)
routes.use('/movietags', movieTagsRoutes)
routes.use('/sessions', sessiosRoutes)

module.exports = routes