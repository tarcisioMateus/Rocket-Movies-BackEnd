const MovieNotesRepository = require('../repositories/MovieNotesRepository')
const MovieTagsRepository = require('../repositories/MovieTagsRepository')

const CreateService = require('../services/movieNotes/CreateService')
const IndexService = require('../services/movieNotes/IndexService')
const ShowService = require('../services/movieNotes/ShowService')
const DeleteService = require('../services/movieNotes/DeleteService')

class MovieNotesController {

    async create (request, response) {
        const { title, description, rating, tags } = request.body
        const user_id = request.user.id

        const createService = new CreateService({
            movieNotesRepository: new MovieNotesRepository(), 
            movieTagsRepository: new MovieTagsRepository()
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
            movieNotesRepository: new MovieNotesRepository(), 
            movieTagsRepository: new MovieTagsRepository()
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
            movieNotesRepository: new MovieNotesRepository(), 
            movieTagsRepository: new MovieTagsRepository()
        })
        const notesWithTags = await indexService.execute({ 
            user_id, 
            title: title ? title.toLowerCase() : title, 
            tags: tags ? tags.split(',').map( tag => tag.toLowerCase().trim()) : tags
        })

        return response.json(notesWithTags)
    }

    async delete (request, response) {
        const { id } = request.params

        const deleteService = new DeleteService({
            movieNotesRepository: new MovieNotesRepository()
        })
        await deleteService.execute({
            id
        })

        return response.json()
    }
}

module.exports = MovieNotesController