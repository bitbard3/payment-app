import z from 'zod'

export const transferSchmea = z.object({
    receiver: z.string().length(24),
    amount: z.number().positive()
})