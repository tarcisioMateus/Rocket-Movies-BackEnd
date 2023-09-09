const appError = require('../../../utils/appError')

class UpdateService {
    constructor({ 
        usersRepository, diskStorage 
    }) {
        this.usersRepository = usersRepository
        this.diskStorage = diskStorage
    }

    async execute({ 
        id, filename
    })
    {
        const user = await this.usersRepository.findById({ id })
        if (!user) throw new appError('only authenticated users can change avatar ')

        if (user.avatar) await this.diskStorage.deleteFile(user.avatar)

        user.avatar = await this.diskStorage.saveFile(filename) 
        const updated = await this.usersRepository.update({ id, user })

        return updated
    }
}

module.exports = UpdateService