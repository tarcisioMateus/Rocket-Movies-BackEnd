const UsersRepository = require('../repositories/UsersRepository')

const CreateService = require('../services/users/CreateService')
const UpdateService = require('../services/users/UpdateService')
const DeleteService = require('../services/users/DeleteService')

class UsersController {
    usersRepository = new UsersRepository()

    async create (request, response) {
        const { name, email, password } = request.body

        const createService = new CreateService({
            usersRepository: this.usersRepository
        })
        const user = await createService.execute({ 
            name, email, password 
        })

        return response.status(201).json()
    }

    async update (request, response) {
        const { name, email, currentPassword, newPassword } = request.body
        const user_id = request.user.id

        const updateService = new UpdateService({
            usersRepository: this.usersRepository
        })
        const userUpdated = await updateService.execute({ 
            id: user_id , name, email, 
            currentPassword, newPassword 
        })

        return response.json()
    }

    async delete (request, response) {
        const user_id = request.user.id

        const deleteService = new DeleteService({
            usersRepository: this.usersRepository
        })
        await deleteService.execute({ id: user_id })

        return response.json()
    }
}

module.exports = UsersController