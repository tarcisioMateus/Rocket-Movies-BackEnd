const { Router } = require('express')

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', usersController.update)
usersRoutes.get('/', usersController.login)
usersRoutes.delete('/:id', usersController.delete)

module.exports = usersRoutes