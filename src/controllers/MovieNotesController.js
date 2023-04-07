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

    async index (request, response) {
        const { title, tags } = request.body
        const { user_id } = request.params

        let notes

        if ( tags ) {
            const Tags = tags.split(',').map( tag => tag.toLowerCase().trim())

            if ( title ) {
                notes = await knex('movie_tags').select(['movie_notes.id', 'movie_notes.title', 'movie_notes.rating'])
                .where('movie_notes.user_id', user_id)
                .whereLike('movie_notes.title', `%${title}%`)
                .whereIn('movie_tags.name', Tags)
                .InnerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
                .orderBy('movie_notes.title')
            } else {
                notes = await knex('movie_tags').select(['movie_notes.id', 'movie_notes.title', 'movie_notes.rating'])
                .where('movie_notes.user_id', user_id)
                .whereIn('movie_tags.name', Tags)
                .InnerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
                .orderBy('movie_notes.title')
            }
        } else {
            notes = await knex('movie_notes').where({ user_id }).whereLike('title', `%${title}%`)
        }

        let notesOneEntryOnly = []
        for (let note of notes) {
            if ( notesOneEntryOnly.filter( nt => nt.id == note.id).length ) continue
            notesOneEntryOnly = [ ...notesOneEntryOnly, note]
        }

        let userTags = await knex('movie_tags').where({ user_id })

        const notesWithTags = notesOneEntryOnly.map( note => {
            const note_tags = userTags.filter( tag => tag.note_id == note_id).map( tag => tag.name)

            return {
                ...note,
                tags: note_tags
            }
        })

        return response.json(notesWithTags)
    }
}

module.exports = MovieNotesController

function inputValidation (title, description, rating) {

    if ( !title ) throw new appError('You must tell the movie title!')
    if ( !description ) throw new appError('You must give the movie a description!')
    if ( !rating ) throw new appError('You must give the movie a rating!')
    if ( rating < 0 || rating > 5) throw new appError('the rating must be between 0 and 5!')
}