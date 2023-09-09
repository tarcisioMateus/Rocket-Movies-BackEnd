class DeleteService {
    constructor({ 
        movieNotesRepository
     }) {
        this.movieNotesRepository = movieNotesRepository
    }

    async execute({
        id
    }) {
        await this.movieNotesRepository.delete({ id })
    }
}

module.exports = DeleteService