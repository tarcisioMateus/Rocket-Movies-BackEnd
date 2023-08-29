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

    async update (request, response) {
        const { name, email, currentPassword, newPassword } = request.body
        const user_id = request.user.id

        const user = await knex('users').where({ id: user_id }).first()

        if ( email ) {
            const userWithEmail = await knex('users').where({ email }).first()

            if ( userWithEmail && userWithEmail.id != user.id ) throw new appError('This Email belongs to another person')

            user.email = email
        }

        if ( newPassword ) {
            if ( !currentPassword ) throw new appError('You must provid your current password to updated it')

            const passwordCheck = await compare(currentPassword, user.password)

            if ( passwordCheck ) {
                user.password = await hash (newPassword, 8)
            } else {
                throw new appError("The given password doesn't match!" )
            }
        }
        
        user.name = name ? name : user.name

        await knex('users').where({ id: user_id }).update({ name: user.name, email: user.email, password: user.password, updated_at: knex.fn.now() })

        return response.json()
    }

    async delete (request, response) {
        const user_id = request.user.id

        await knex('users').where({id: user_id}).delete()

        return response.json()
    }
}

module.exports = UsersController