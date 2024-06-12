import zod from 'zod'

const createPostSchema = zod.object({
    title: zod.string(),
    content: zod.string()
})

export default createPostSchema;