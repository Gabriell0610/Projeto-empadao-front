import { z } from 'zod'
import { passwordValidation } from './validations/password'

export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  senha: passwordValidation,
})
