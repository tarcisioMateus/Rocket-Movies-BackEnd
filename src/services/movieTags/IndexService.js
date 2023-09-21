class IndexService {
    constructor({ 
        movieTagsRepository
     }) {
        this.movieTagsRepository = movieTagsRepository
    }

    async execute({
        user_id
    }) {
        const tags = (await this.movieTagsRepository.getUserTags({ user_id })).map(tag => tag.name)

        let filteredTags = []
        for (let tag of tags) {
            if (filteredTags.includes(tag)) continue
            filteredTags = [ ...filteredTags, tag]
        }
        return filteredTags
    }
}

module.exports = IndexService