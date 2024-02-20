import z from 'zod'

export const addFriendSchema = z.string().length(24)