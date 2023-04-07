const knex = require('../database/knex')

const appError = require('../utils/appError')

class MovieNotesController {
    async create (request, response) {
        const { title, description, rating } = request.body
        const { user_id } = request.params

        inputValidation (title, description, rating)
        
    }
}

module.exports = MovieNotesController

function inputValidation (title, description, rating) {

    if ( !title ) throw new appError('You must tell the movie title!')
    if ( !description ) throw new appError('You must give the movie a description!')
    if ( !rating ) throw new appError('You must give the movie a rating!')
    if ( rating < 0 || rating > 5) throw new appError('the rating must be between 0 and 5!')
}