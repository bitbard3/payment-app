import z from 'zod'

export const userSchema = z.object({
    username: z.string().min(3).max(30).trim().toLowerCase(),
    password: z.string().min(4),
    firstName: z.string().max(50).trim(),
    lastName: z.string().max(50).trim()
})

export const userUpdateSchema = z.object({
    password: z.string().min(4).optional(),
    firstName: z.string().max(50).trim().optional(),
    lastName: z.string().max(50).trim().optional()
})