const knex = require('../database/knex')

const { hash, compare } = require('bcryptjs')

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body

        const userWithEmail = await knex('users').where({ email }).first()

        if ( userWithEmail ) 
    }
}

module.exports = UsersController