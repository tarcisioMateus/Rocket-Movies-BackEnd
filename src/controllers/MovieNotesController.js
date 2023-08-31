const knex = require('../database/knex')

const appError = require('../utils/appError')

class MovieNotesController {
    async create (request, response) {
        const { title, description, rating, tags } = request.body
        const user_id = request.user.id

        inputValidation (title, description, rating)

        const [ id ] = await knex('movie_notes').insert({ title: title.toLowerCase(), description, rating, user_id })

        if ( tags ) {
            const Tags = tags.map( tag => tag.toLowerCase().trim())
            
            for (let name of Tags) {
                await knex('movie_tags').insert({name, user_id, note_id: id})
            }
        }

        return response.status(201).json()
    }

    async show (request, response) {
        const { id } = request.params

        const note = await knex('movie_notes').where({ id }).first()
        const tags = await knex('movie_tags').where({ note_id: note.id})

        return response.json({...note, tags})
    }

    async index (request, response) {
        const { title, tags } = request.query
        const user_id = request.user.id

        let notes

        if ( tags ) {
            notes = await indexSearchWithTags ( user_id, tags, title)
        } else {
            notes = title 
                ? await knex('movie_notes').where({ user_id }).whereLike('title', `%${title.toLowerCase()}%`).orderBy('movie_notes.title') 
                : await knex('movie_notes').where({ user_id }).orderBy('movie_notes.title')
        }

        notes = notesOneEntryOnly (notes)

        let userTags = await knex('movie_tags').where({ user_id })

        const notesWithTags = notes.map( note => {
            const note_tags = userTags.filter( tag => tag.note_id == note.id)

            return {
                ...note,
                tags: note_tags
            }
        })

        return response.json(notesWithTags)
    }

    async delete (request, response) {
        const { id } = request.params

        await knex('movie_notes').where({ id }).delete()

        return response.json()
    }
}

module.exports = MovieNotesController

function inputValidation (title, description, rating) {

    if ( !title ) throw new appError('You must tell the movie title!')
    if ( !description ) throw new appError('You must give the movie a description!')
    if ( !rating ) throw new appError('You must give the movie a rating!')
    if ( isNaN(rating)) throw new appError('The Rating must be a Number between 0 and 5!')
    if ( rating < 0 || rating > 5) throw new appError('the rating must be between 0 and 5!')
}

async function indexSearchWithTags ( user_id, tags, title) {
    let notes
    const Tags = tags.map( tag => tag.toLowerCase().trim())

    if ( title ) {
        notes = await knex('movie_tags').select(['movie_notes.id', 'movie_notes.title', 'movie_notes.description', 'movie_notes.rating'])
        .where('movie_notes.user_id', user_id)
        .whereLike('movie_notes.title', `%${title.toLowerCase()}%`)
        .whereIn('movie_tags.name', Tags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
        .orderBy('movie_notes.title')
    } else {
        notes = await knex('movie_tags').select(['movie_notes.id', 'movie_notes.title', 'movie_notes.description', 'movie_notes.rating'])
        .where('movie_notes.user_id', user_id)
        .whereIn('movie_tags.name', Tags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
        .orderBy('movie_notes.title')
    }
    return notes
}

function notesOneEntryOnly (notes) {
    let filteredNotes = []
    for (let note of notes) {
        if ( filteredNotes.filter( nt => nt.id == note.id).length ) continue
        filteredNotes = [ ...filteredNotes, note]
    }
    return filteredNotes
}