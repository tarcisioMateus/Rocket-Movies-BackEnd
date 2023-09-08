const { hash, compare } = require('bcryptjs')
const appError = require('../../utils/appError')

class UpdateService {
    constructor({ usersRepository }) {
        this.usersRepository = usersRepository
    }

    async execute({ 
        id , name, email, currentPassword, newPassword 
    }) {

        const user = await this.usersRepository.findById({ id })

        if ( email ) {
            const userWithEmail = await this.usersRepository.findByEmail({ email })

            if ( userWithEmail && userWithEmail.id != user.id ) throw new appError('This Email belongs to another person')

            user.email = email
        }

        if ( newPassword ) {
            if ( !currentPassword ) throw new appError('You must provid your current password to updated it')

            const passwordMatched = await compare(currentPassword, user.password)

            if ( passwordMatched ) {
                user.password = await hash (newPassword, 8)
            } else {
                throw new appError("The given password doesn't match!" )
            }
        }
        
        user.name = name ? name : user.name

        const updated = await this.usersRepository.update({ 
            id, user 
        })
        return updated
    }
}

module.exports = UpdateService