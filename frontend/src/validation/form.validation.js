import z from 'zod'

export const formSchema = z.object({
    firsName: z.string({}).max(50).trim().min(1, { message: 'Please fill the name' }),
    lastName: z.string().max(50).trim().min(1, { message: 'Please fill the name' }),
    username: z.string().min(3, { message: "Username is too short" }).max(30, { message: "Username is too long" }).trim().toLowerCase(),
    password: z.string().min(4, { message: "Password is too short" })
})