import zod from 'zod'

const signInSchema = zod.object({
    email: zod.string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
    password: zod.string()
})

export default signInSchema