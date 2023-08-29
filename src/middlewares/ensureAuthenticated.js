const authConfig = require('../configs/auth')
const { verify } = require('jsonwebtoken')
const appError = require('../utils/appError')

function ensureAuthenticated(request, response, next) {
  const authHeaders = request.headers.authorization
  if (!authHeaders) throw new appError('JWT missing.')

  const [, token] = authHeaders.split(' ')

  try {
    const {sub: userId} = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(userId)
    }
    return next()
  } catch {
    throw new appError('JWT invalid.')  
  }

}

module.exports = ensureAuthenticated