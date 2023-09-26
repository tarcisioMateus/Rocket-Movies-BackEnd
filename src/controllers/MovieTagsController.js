const MovieTagsRepository = require('../repositories/MovieTagsRepository')

const IndexService = require('../services/movieTags/IndexService')

class MovieTagsController {

    async index (request, response) {
        const user_id = request.user.id

        const indexService = new IndexService({
            movieTagsRepository: new MovieTagsRepository()
        })
        const tags = await indexService.execute({
            user_id
        })

        return response.json( tags )
    }
}

module.exports = MovieTagsController