class ShowService {
    constructor({ 
        movieNotesRepository, movieTagsRepository
     }) {
        this.movieNotesRepository = movieNotesRepository
        this.movieTagsRepository = movieTagsRepository
    }

    async execute({ 
        id 
    }) {
        const note = await this.movieNotesRepository.getById({ id })
        const tags = await this.movieTagsRepository.getByNoteId({ 
            note_id: id
        })
        return {...note, tags}
    }
}

module.exports = ShowService