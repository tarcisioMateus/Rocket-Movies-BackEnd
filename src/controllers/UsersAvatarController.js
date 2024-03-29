const UsersRepository = require('../repositories/UsersRepository')
const DiskStorage = require('../providers/DiskStorage')

const UpdateService = require('../services/users/avatar/UpdateService')

class UsersAvatarController { 

  async update(request, response) {
    const user_id = request.user.id
    const { filename } = request.file

    const updateService = new UpdateService({
      usersRepository: new UsersRepository(), 
      diskStorage: new DiskStorage()
    })
    const updated = await updateService.execute({ 
      id: user_id, filename
    })

    return response.json( updated.avatar )
  }
}

module.exports = UsersAvatarController