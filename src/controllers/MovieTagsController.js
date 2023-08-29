const knex = require('../database/knex')

class MovieTagsController {
    async index (request, response) {
        const user_id = request.user.id

        const tags = (await knex('movie_tags').where({ user_id }).orderBy('name')).map(tag => tag.name)

        let filterdTags = []
        for (let tag of tags) {
            if (filterdTags.includes(tag)) continue
            filterdTags = [ ...filterdTags, tag]
        }
        return response.json(filterdTags)
    }
}

module.exports = MovieTagsController