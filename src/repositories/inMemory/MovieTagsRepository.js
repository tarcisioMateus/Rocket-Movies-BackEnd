const { randomUUID } = require('crypto')

class MovieTagsRepository {
    tags = []

    async create({ name, user_id, note_id }) {
        const tag = {
            id: randomUUID(),
            name, user_id, note_id
        }
        const length = this.tags.push(tag)
        return this.tags[length - 1]
    }

    async getByNoteId({ note_id }) {
        const noteTags = this.tags.filter( tag => tag.note_id === note_id)
        return noteTags
    }

    async getUserTags({ user_id }) {
        const userTags = this.tags.filter( tag => tag.user_id === user_id)
        return userTags
    }
}

module.exports = MovieTagsRepository