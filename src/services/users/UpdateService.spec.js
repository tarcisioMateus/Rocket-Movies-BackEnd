const CreateService = require('./CreateService')
const UpdateService = require('./UpdateService')
const SessionCreateService = require('../sessions/CreateService')

const UsersRepository = require('../../repositories/inMemory/UserRepository')
const appError = require('../../utils/appError')

describe('User/ UpdateService', () => {
    let usersRepository = null

    let createService = null
    let updateService = null
    let sessionCreateService = null

    beforeEach(() => {
        usersRepository = new UsersRepository()

        createService = new CreateService({usersRepository})
        updateService = new UpdateService({usersRepository})
        sessionCreateService = new SessionCreateService({usersRepository})
    })

    it('Should NOT update email to one already in use', async () => {
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
        const user1Created = await createService.execute(user1)
        await createService.execute(user2)

        await expect(updateService.execute({
            id: user1Created.id , name: undefined, email: 'test2@mail', 
            currentPassword: undefined, newPassword: undefined
        })).rejects.toEqual( new appError('This Email belongs to another person'))
    })

    it('Should updated email', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }

        const user1Created = await createService.execute(user1)
        const updated = await updateService.execute({
            id: user1Created.id , name: undefined, email: 'test123@mail', 
            currentPassword: undefined, newPassword: undefined
        })

        expect(updated).toHaveProperty('email', 'test123@mail')
    })
    
    it('Should NOT update password passing the wrong one', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        const user1Created = await createService.execute(user1)

        await expect(updateService.execute({
            id: user1Created.id , name: undefined, email: undefined, 
            currentPassword: 'undefined', newPassword: 'undefined'
        })).rejects.toEqual( new appError("The given password doesn't match!" ))
    })

    it('Should login with password updated', async () => {
        const user1 = {
            name: 'test 1', 
            email: 'test1@mail', 
            password: '123'
        }
        const user1Created = await createService.execute(user1)

        await updateService.execute({
            id: user1Created.id , name: undefined, email: undefined, 
            currentPassword: '123', newPassword: 'undefined'
        })
        const data = await sessionCreateService.execute({
            email: 'test1@mail', password: 'undefined'
        })

        expect(data).toHaveProperty('user')
    })
})