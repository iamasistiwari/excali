import { z } from 'zod'

export const zod = z

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
});

export const SiginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    slug: z.string()
})

export const ParsedData = z.object({
  type: z.enum(["join_room", "leave_room" ,"chat"]),
  roomId: z.string(),
  message: z.string().optional()
});