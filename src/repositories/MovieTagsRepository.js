const knex = require('../database/knex')

class MovieTagsRepository {
    async create({ name, user_id, note_id }) {
        const [ id ] = await knex('movie_tags').insert({
            name, user_id, note_id
        })
        return { id }
    }

    async getByNoteId({ note_id }) {
        const tags = await knex('movie_tags').where({ note_id })
        return tags
    }

    async getUserTags({ user_id }) {
        const tags = await knex('movie_tags').where({ user_id }).orderBy('name')
        return tags
    }
}

module.exports = MovieTagsRepository