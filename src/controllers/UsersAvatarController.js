const UsersRepository = require('../repositories/UsersRepository')
const DiskStorage = require('../providers/DiskStorage')

const UpdateService = require('../services/users/avatar/UpdateService')

class UsersAvatarController {
  usersRepository = new UsersRepository()
  diskStorage = new DiskStorage()

  async update(request, response) {
    const user_id = request.user.id
    const { filename } = request.file

    const updateService = new UpdateService({
      usersRepository: this.usersRepository, 
      diskStorage: this.diskStorage
    })
    const updated = await updateService.execute({ 
      id: user_id, filename
    })

    return response.json( updated )
  }
}

module.exports = UsersAvatarController