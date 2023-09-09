const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const appError = require('../../utils/appError')
const authConfig = require('../../configs/auth')

class CreateService {
    constructor({ 
        usersRepository 
    }) {
        this.usersRepository = usersRepository
    }

    async execute({ 
        email, password 
    }) {
        const user = await this.usersRepository.findByEmail({ 
            email 
        })
        if (!user) throw new appError('Wrong E-mail or Password')

        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) throw new appError('Wrong E-mail or Password')

        const { secret, expiresIn } = authConfig.jwt
        const token =  sign({}, secret, {
        subject: String(user.id),
        expiresIn
        })

        return { token, user }
    }
}

module.exports = CreateService