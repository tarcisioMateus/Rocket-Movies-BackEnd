const { randomUUID } = require('crypto')

class UsersRepository {
    users = []

    async findByEmail({ email }) {
        const user = users.find( user => user.email === email)
        return user
    }

    async create({ name, email, password }) {
        const user = {
            id: randomUUID(),
            avatar: null,
            name, email, password
        }
        const lengtg = users.push(user)
        return users[length - 1]
    }

    async findById({ id }) {
        const user = users.find( user => user.id === id)
        return user
    }

    async update({ id, user }) {
        const index = users.findIndex( user => user.id === id )
        if (index === -1 ) return []
        users[ index ] = {
            name: user.name, email: user.email, 
            avatar: user.avatar, 
            password: user.password,
        }
        return users[ index ]
    }

    async delete({ id }) {
        const index = users.findIndex( user => user.id === id )
        if (index === -1 ) return
        users[ index ] = {}
    }
}

module.exports = UsersRepository