import zod from 'zod'

const signUpSchema = zod.object({
    username: zod.string(),
    email: zod
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
    password: zod.string()
})

export default signUpSchema