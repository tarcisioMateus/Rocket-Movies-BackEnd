const MovieNotesRepository = require('../repositories/MovieNotesRepository')
const MovieTagsRepository = require('../repositories/MovieTagsRepository')

const CreateService = require('../services/movieNotes/CreateService')
const IndexService = require('../services/movieNotes/IndexService')
const ShowService = require('../services/movieNotes/ShowService')
const DeleteService = require('../services/movieNotes/DeleteService')

class MovieNotesController {
    movieNotesRepository = new MovieNotesRepository()
    movieTagsRepository = new MovieTagsRepository()


    async create (request, response) {
        const { title, description, rating, tags } = request.body
        const user_id = request.user.id

        const createService = new CreateService({
            movieNotesRepository: this.movieNotesRepository, movieTagsRepository: this.movieTagsRepository
        })
        await createService.execute({ 
            user_id, title: title.toLowerCase(), 
            description, rating, 
            tags: tags.map( tag => tag.toLowerCase().trim())
        }) 
        return response.status(201).json()
    }

    async show (request, response) {
        const { id } = request.params

        const showService = new ShowService({
            movieNotesRepository: this.movieNotesRepository, movieTagsRepository: this.movieTagsRepository
        })
        const data = await showService.execute({ 
            id 
        })

        return response.json( data )
    }

    async index (request, response) {
        const { title, tags } = request.query
        const user_id = request.user.id

        const indexService = new IndexService({
            movieNotesRepository: this.movieNotesRepository, movieTagsRepository: this.movieTagsRepository
        })
        const notesWithTags = await indexService.execute({ 
            user_id, 
            title: title.toLowerCase(), 
            tags: tags.split(',').map( tag => tag.toLowerCase().trim())
        })

        return response.json(notesWithTags)
    }

    async delete (request, response) {
        const { id } = request.params

        const deleteService = new DeleteService({
            movieNotesRepository: this.movieNotesRepository
        })
        await deleteService.execute({
            id
        })

        return response.json()
    }
}

module.exports = MovieNotesController