const knex = require('../database/knex')

class MovieNotesRepository {
    async create({ title, description, rating, user_id }) {
        const [ id ] = await knex('movie_notes').insert({ 
            title, description, rating, user_id 
        })
        return { id }
    }

    async getById({ id }) {
        const note = await knex('movie_notes').where({ id }).first()
        return note
    }

    async getUserNotes({ user_id }) {
        const notes = await knex('movie_notes').where({ user_id }).orderBy('movie_notes.title')
        return notes
    }

    async getNotesByTitle({ user_id, title }) {
        const notes = knex('movie_notes').where({ user_id }).whereLike('title', `%${title}%`).orderBy('movie_notes.title')
        return notes
    }

    async getNotesByTags({ user_id, tags }) {
        const notes = await knex('movie_tags').select([
            'movie_notes.id', 'movie_notes.title', 
            'movie_notes.description', 'movie_notes.rating'
        ])
        .where('movie_notes.user_id', user_id)
        .whereIn('movie_tags.name', tags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
        .orderBy('movie_notes.title')

        return notes
    }

    async getNotesByTagsAndTitle({ user_id, tags, title }) {
        const notes = await knex('movie_tags').select([
            'movie_notes.id', 'movie_notes.title', 
            'movie_notes.description', 'movie_notes.rating'
        ])
        .where('movie_notes.user_id', user_id)
        .whereLike('movie_notes.title', `%${title}%`)
        .whereIn('movie_tags.name', tags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
        .orderBy('movie_notes.title')

        return notes
    }

    async delete({ id }) {
        await knex('movie_notes').where({ id }).delete()
    }
}

module.exports = MovieNotesRepository