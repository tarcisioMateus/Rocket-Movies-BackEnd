const { hash } = require('bcryptjs')
const appError = require('../../utils/appError')

class CreateService {
    constructor({ usersRepository }) {
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password }) {
        const userWithEmail = await this.usersRepository.findByEmail({ email })

        if ( userWithEmail ) throw new appError('Email already in use!')

        const cryptedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({ 
            name, email, password: cryptedPassword 
        })
        return user
    }
}

module.exports = CreateService