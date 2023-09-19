const { randomUUID } = require('crypto')

class UsersRepository {
    users = []

    async findByEmail({ email }) {
        const user = this.users.find( user => user.email === email)
        return user
    }

    async create({ name, email, password }) {
        const user = {
            id: randomUUID(),
            avatar: null,
            name, email, password
        }
        const length = this.users.push(user)
        return this.users[length - 1]
    }

    async findById({ id }) {
        const user = this.users.find( user => user.id === id)
        return user
    }

    async update({ id, user }) {
        const index = this.users.findIndex( user => user.id === id )
        if (index === -1 ) return []
        this.users[ index ] = user
        return this.users[ index ]
    }

    async delete({ id }) {
        const index = this.users.findIndex( user => user.id === id )
        if (index === -1 ) return
        this.users[ index ] = {}
    }
}

module.exports = UsersRepository