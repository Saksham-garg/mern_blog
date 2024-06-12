import zod from 'zod'

const signUpSchema = zod.object({
    username: zod.string()
    .min(7, { message: "Username must be between 7 ans 20 characters" })
    .max(20,{ message:"Username must be between 7 ans 20 characters"})
    .refine((value) => !value.includes(' '),{message:"Username cannot contain spaces"})
    .refine((value) => value === value.toLowerCase(),{message:"Username must be lowercase"})
    .refine((value) => /^[a-z0-9]+$/.test(value),{message:"Username can only contain letters and numbers"})
    .optional()
    ,
    email: zod
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .optional()
    ,
    password: zod.string()
    .min(6,{message:"Password must be atleast 6 characters long"})
    .optional()
})
    
export default signUpSchema