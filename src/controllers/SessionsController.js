const UsersRepository = require('../repositories/UsersRepository')

const CreateService = require('../services/sessions/CreateService')

class SessionsController {
  usersRepository = new UsersRepository()

  async create(request, response) {
    const { email, password } = request.body

    const createService = new CreateService({
      usersRepository: this.usersRepository
    })
    const { token, user } = await createService.execute({ 
      email, password 
    })

    return response.json({ token, user })
  }
}

module.exports = SessionsController