const knex = require('../database/knex')
const appError = require('../utils/appError')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const authConfig = require('../configs/auth')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({email}).first()
    if (!user) throw new appError('Wrong E-mail or Password')

    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) throw new appError('Wrong E-mail or Password')

    const { secret, expiresIn } = authConfig.jwt
    const token =  sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ token, user })
  }
}

module.exports = SessionsController