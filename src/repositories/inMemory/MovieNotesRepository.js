const { randomUUID } = require('crypto')

class MovieNotesRepository {
    notes = []
    tags = []

    async create({ title, description, rating, user_id }) {
        const note = {
            id: randomUUID(),
            title, description, rating, user_id
        }
        const length = this.notes.push(note)
        return this.notes[length - 1]
    }

    async getById({ id }) {
        const note = this.notes.find( note => note.id === id)
        return note
    }

    async getUserNotes({ user_id }) {
        const userNotes = this.notes.filter( note => note.user_id === user_id)
        return userNotes
    }

    async getNotesByTitle({ user_id, title }) {
        const userNotes = this.notes.filter( note => {
            if (note.user_id === user_id) {
                if (note.title.includes(title)) {
                    return true
                }
            }
            return false
        })
        return userNotes
    }

    async getNotesByTags({ user_id, tags }) {
        const userNotes = this.notes.filter( note => {
            if (note.user_id === user_id) {
                const noteTags = this.tags.filter( tag => tag.note_id === note.id) 
                for ( const tag of noteTags ) {
                    if (tags.includes(tag.name)) return true
                }
            }
            return false
        })
        return userNotes
    }

    async getNotesByTagsAndTitle({ user_id, tags, title }) {
        const userNotes = this.notes.filter( note => {
            if (note.user_id === user_id) {
                if (note.title.includes(title)) {
                    const noteTags = this.tags.filter( tag => tag.note_id === note.id) 
                    for ( const tag of noteTags ) {
                        if (tags.includes(tag.name)) return true
                    }
                }
            }
            return false
        })
        return userNotes
    }

    async delete({ id }) {
        const index = this.notes.findIndex( note => note.id === id )
        if (index === -1 ) return
        this.notes[ index ] = {}
    }
}

module.exports = MovieNotesRepository