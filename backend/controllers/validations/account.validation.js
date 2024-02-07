import z from 'zod'

export const transferSchmea = z.object({
    to: z.string().length(24),
    amount: z.number().positive()
})