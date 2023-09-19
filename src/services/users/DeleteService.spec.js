const CreateService = require('./CreateService')
const DeleteService = require('./DeleteService')
const UserRepository = require('../../repositories/inMemory/UserRepository')

describe('UserDeleteSevice', () => {
    let userRepository = null
    let createService = null
    let deleteService = null

    beforeEach(() => {
        userRepository = new UserRepository()
        createService = new CreateService(userRepository)
        deleteService = new DeleteService(userRepository)
    })

    it('user should be deleted', async () => {
        const user = {
            name: 'test 1', 
            email: 'test@mail', 
            password: '123'
        }

        const userCreated = await createService.execute(user)
        await deleteService.execute({ id: userCreated.id})
        expect(userRepository.users).toStrictEqual([{}])
    })

    it('only one user should be deleted', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        const user2 = {
            name: 'test 2', 
            email: 'test2@mail', 
            password: '456'
        }

        const userCreated1 = await createService.execute(user1)
        const userCreated2 = await createService.execute(user2)
        await deleteService.execute({ id: userCreated1.id})
        expect(userRepository.users).toStrictEqual([{}, userCreated2])

    })
})