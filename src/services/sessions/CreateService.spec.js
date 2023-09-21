const CreateService = require('./CreateService')
const UsersCreateService = require('../users/CreateService')

const UsersRepository = require('../../repositories/inMemory/UserRepository')
const appError = require('../../utils/appError')

describe('User/ UpdateService', () => {
    let usersRepository = null

    let createService = null
    let usersCreateService = null

    beforeEach(() => {
        usersRepository = new UsersRepository()

        createService = new CreateService({usersRepository})
        usersCreateService = new UsersCreateService({usersRepository})
    })

    it('Should NOT login with wrong email', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        await usersCreateService.execute(user1)

        await expect(createService.execute({
            email: 'BlaBlaBla@mail', password: '123'
        })).rejects.toEqual( new appError('Wrong E-mail or Password'))
    })

    it('Should NOT login with wrong password', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        await usersCreateService.execute(user1)

        await expect(createService.execute({
            email: 'test1@mail', password: '123456'
        })).rejects.toEqual( new appError('Wrong E-mail or Password'))
    })

    it('Should create a new session successfully', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        await usersCreateService.execute(user1)

        const data = await createService.execute({
            email: 'test1@mail', password: '123'
        })
        expect(data).toHaveProperty('user')
    })


})