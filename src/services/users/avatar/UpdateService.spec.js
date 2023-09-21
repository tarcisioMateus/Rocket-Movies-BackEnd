const CreateService = require('../CreateService')
const UpdateService = require('./UpdateService')

const UsersRepository = require('../../../repositories/inMemory/UserRepository')
const DiskStorage = require('../../../providers/DiskStorageInMemory')

describe('User/Avatar UpdateService', () => {
    let usersRepository = null
    let diskStorage = null

    let createService = null
    let updateService = null

    beforeEach(() => {
        usersRepository = new UsersRepository()
        diskStorage = new DiskStorage()

        createService = new CreateService({usersRepository})
        updateService = new UpdateService({usersRepository, diskStorage})
    })

    it('Should update the avatar', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        const user1Created = await createService.execute(user1)

        const updated = await updateService.execute({
            id: user1Created.id, filename: 'AvAtAr.png'
        })
        expect(updated).toHaveProperty('avatar', 'AvAtAr.png')
    })

})