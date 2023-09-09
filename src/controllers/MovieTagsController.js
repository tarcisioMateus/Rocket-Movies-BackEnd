const MovieTagsRepository = require('../repositories/MovieTagsRepository')

const IndexService = require('../services/movieTags/IndexService')

class MovieTagsController {
    movieTagsRepository = new MovieTagsRepository()

    async index (request, response) {
        const user_id = request.user.id

        const indexService = new IndexService({
            movieTagsRepository: this.movieTagsRepository
        })
        const tags = await indexService.execute({
            user_id
        })

        return response.json( tags )
    }
}

module.exports = MovieTagsController