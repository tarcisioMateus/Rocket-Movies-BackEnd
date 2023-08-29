const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')
const appError = require('../utils/appError')

class UsersAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const filename = request.file.filename

    const user = await knex('users').where({ id: user_id}).first()
    if (!user) throw new appError('only authenticated users can change avatar ')

    const diskStorage = new DiskStorage()
    if (user.avatar) await diskStorage.deleteFile(user.avatar)

    user.avatar = await diskStorage.saveFile(filename) 
    await knex('users').update(user).where( {id: user_id})

    return response.json(filename)
  }
}

module.exports = UsersAvatarController