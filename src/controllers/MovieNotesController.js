const knex = require('../database/knex')

const appError = require('../utils/appError')

class MovieNotesController {
    async create (request, response) {
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params

        inputValidation (title, description, rating)

        const [ id ] = await knex('movie_notes').insert({ title, description, rating, user_id })

        if ( tags ) {
            const Tags = tags.split(',').map( tag => tag.toLowerCase().trim())
            
            for (let name of Tags) {
                await knex('movie_tags').insert({name, user_id, note_id: id})
            }
        }

        return response.status(201).json()
    }

    async show (request, response) {
        const { id } = request.params

        const note = await knex('movie_notes').where({ id }).first()

        return response.json(note)
    }
}

module.exports = MovieNotesController

function inputValidation (title, description, rating) {

    if ( !title ) throw new appError('You must tell the movie title!')
    if ( !description ) throw new appError('You must give the movie a description!')
    if ( !rating ) throw new appError('You must give the movie a rating!')
    if ( rating < 0 || rating > 5) throw new appError('the rating must be between 0 and 5!')
}