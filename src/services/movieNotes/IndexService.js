class IndexService {
    constructor({ 
        movieNotesRepository, movieTagsRepository
    }) {
        this.movieNotesRepository = movieNotesRepository
        this.movieTagsRepository = movieTagsRepository
    }

    async execute({ 
        user_id, title, tags
    }) {
        let notes

        if ( tags ) {
            notes = await searchWithTags ({
                user_id, tags, title, 
                movieNotesRepository: this.movieNotesRepository
            })
        } else {
            notes = title 
                ? await this.movieNotesRepository.getNotesByTitle({ user_id, title })
                : await this.movieNotesRepository.getUserNotes({ user_id })
        }
        notes = notesOneEntryOnly (notes)

        let userTags = await this.movieTagsRepository.getUserTags({ user_id })

        const notesWithTags = notes.map( note => {
            const note_tags = userTags.filter( tag => tag.note_id == note.id)

            return {
                ...note,
                tags: note_tags
            }
        })
        return notesWithTags
    }
}

module.exports = IndexService

async function searchWithTags ({
    user_id, tags, title, movieNotesRepository
}) {
    let notes

    if ( title ) {
        notes = await movieNotesRepository.getNotesByTagsAndTitle({ 
            user_id, tags, title 
        })
    } else {
        notes = await movieNotesRepository.getNotesByTags({ 
            user_id, tags 
        })
    }
    return notes
}

function notesOneEntryOnly (notes) {
    let filteredNotes = []
    for (let note of notes) {
        if ( filteredNotes.find( nt => nt.id == note.id) ) continue
        filteredNotes = [ ...filteredNotes, note]
    }
    return filteredNotes
}