const CreateService = require('./CreateService')
const UserRepository = require('../../repositories/inMemory/UserRepository')
const appError = require('../../utils/appError')

describe('UserCreateSevice', () => {
    let userRepository = null
    let createService = null

    beforeEach(() => {
        userRepository = new UserRepository()
        createService = new CreateService(userRepository)
    })

    it('User should be created', async () => {
        const user = {
            name: 'test 1', 
            email: 'test@mail', 
            password: '123'
        }

        const userCreated = await createService.execute(user)
        expect(userCreated).toHaveProperty('id')
    })

    it('Should Not create user with existing email', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test@mail', 
            password: '123'
        }
        const user2 = {
            name: 'test 2', 
            email: 'test@mail', 
            password: '456'
        }

        await createService.execute(user1)
        await expect(createService.execute(user2)).rejects.toEqual( new appError('Email already in use!'))
    })
})