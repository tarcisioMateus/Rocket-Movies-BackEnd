const knex = require('../database/knex')

const { hash, compare } = require('bcryptjs')

const appError = require('../utils/appError')

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body

        const userWithEmail = await knex('users').where({ email }).first()

        if ( userWithEmail ) throw new appError('Email already in use!')

        const cryptedPassword = await hash(password, 8)

        await knex('users').insert({ name, email, password: cryptedPassword})

        return response.status(201).json()
    }
}

module.exports = UsersController