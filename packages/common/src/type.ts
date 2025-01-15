import { z } from 'zod'

export const zod = z

export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    avatarUrl: z.string().url().optional()
})

export const SiginSchema = z.object({
    email: z.string(),
    password: z.string().min(8)
})

export const CreateRoomSchema = z.object({
    slug: z.string()
})