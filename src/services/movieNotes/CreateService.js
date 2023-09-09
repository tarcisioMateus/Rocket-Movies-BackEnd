const appError = require('../../utils/appError')

class CreateService {
    constructor({ 
        movieNotesRepository, movieTagsRepository
     }) {
        this.movieNotesRepository = movieNotesRepository
        this.movieTagsRepository = movieTagsRepository
    }

    async execute({ 
        user_id, title, description, rating, tags 
    }) {
        inputValidation (title, description, rating)

        const note = await this.movieNotesRepository.create({ 
            title, description, rating, user_id 
        })

        if ( tags ) {
            
            for (let name of tags) {
                await this.movieTagsRepository.create({ 
                    name, user_id, note_id: note.id 
                })
            }
        }
        return note
    }
}

module.exports = CreateService

function inputValidation (title, description, rating) {

    if ( !title ) throw new appError('You must tell the movie title!')
    if ( !description ) throw new appError('You must give the movie a description!')
    if ( !rating ) throw new appError('You must give the movie a rating!')
    if ( isNaN(rating)) throw new appError('The Rating must be a Number between 0 and 5!')
    if ( rating < 0 || rating > 5) throw new appError('the rating must be between 0 and 5!')
}