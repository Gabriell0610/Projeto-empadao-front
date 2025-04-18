import { z } from 'zod'
import { passwordValidation } from './validations/password'

export const loginSchema = z.object({
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  password: passwordValidation,
})

export type loginDto = z.infer<typeof loginSchema>
