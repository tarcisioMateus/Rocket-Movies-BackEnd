class DeleteService {
    constructor({ 
        usersRepository
     }) {
        this.usersRepository = usersRepository
    }

    async execute({
        id
    }) {
        await this.usersRepository.delete({ id })
    }
}

module.exports = DeleteService