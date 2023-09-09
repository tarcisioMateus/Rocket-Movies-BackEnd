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

        let filterdTags = []
        for (let tag of tags) {
            if (filterdTags.includes(tag)) continue
            filterdTags = [ ...filterdTags, tag]
        }
        return filterdTags
    }
}

module.exports = IndexService