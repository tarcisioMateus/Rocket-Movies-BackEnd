const CreateService = require('./CreateService')

const MovieNotesRepository = require('../../repositories/inMemory/MovieNotesRepository')
const MovieTagsRepository = require('../../repositories/inMemory/MovieTagsRepository')
const appError = require('../../utils/appError')

describe('User/ CreateService', () => {
    let notesRepository = null
    let tagsRepository = null

    let createService = null

    beforeEach(() => {
        notesRepository = new MovieNotesRepository()
        tagsRepository = new MovieTagsRepository()

        createService = new CreateService({
            movieNotesRepository: notesRepository, movieTagsRepository: tagsRepository
        })
    })

    it('Should NOT create a note without a title', async () => {
        const note1 = {
            user_id: 1, title: undefined, description: undefined, rating: undefined, tags: undefined
        }

        await expect(createService.execute(note1)).rejects.toEqual(
            new appError('You must tell the movie title!')
        )
    })

    it('Should NOT create a note without a description', async () => {
        const note1 = {
            user_id: 1, title: 'undefined', description: undefined, rating: undefined, tags: undefined
        }

        await expect(createService.execute(note1)).rejects.toEqual(
            new appError('You must give the movie a description!')
        )
    })

    it('Should NOT create a note without rating', async () => {
        const note1 = {
            user_id: 1, title: 'undefined', description: 'undefined', rating: undefined, tags: undefined
        }

        await expect(createService.execute(note1)).rejects.toEqual(
            new appError('You must give the movie a rating!')
        )
    })

    it('Should NOT create a note where the rating isNaN()', async () => {
        const note1 = {
            user_id: 1, title: 'undefined', description: 'undefined', rating: 'one', tags: undefined
        }

        await expect(createService.execute(note1)).rejects.toEqual(
            new appError('The Rating must be a Number between 0 and 5!')
        )
    })

    it('Should NOT create a note where the rating is out of range', async () => {
        const note1 = {
            user_id: 1, title: 'undefined', description: 'undefined', rating: 6, tags: undefined
        }

        await expect(createService.execute(note1)).rejects.toEqual(
            new appError('the rating must be between 0 and 5!')
        )
    })

    it('Should NOT create a note where the rating is out of range', async () => {
        const note1 = {
            user_id: 1, title: 'undefined', description: 'undefined', rating: 2, tags: undefined
        }

        const newNote = await createService.execute(note1)
        expect(newNote).toHaveProperty('id')
    })
})