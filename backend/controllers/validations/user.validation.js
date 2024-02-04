import z from 'zod'

export const userSignupSchema = z.object({
    username: z.string().required().min(3).max(30).trim().toLowerCase(),
    password: z.string().required().min(4),
    firstName: z.string().required().max(50).trim(),
    lastName: z.string().required().max(50).trim()
})