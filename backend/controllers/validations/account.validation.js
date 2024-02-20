import z from 'zod'

export const transferSchmea = z.object({
    sender: z.string().length(24),
    receiver: z.string().length(24),
    amount: z.number().positive()
})