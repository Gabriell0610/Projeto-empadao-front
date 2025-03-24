import { z } from 'zod'
import { passwordValidation } from './validations/password'

export const registerSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  senha: passwordValidation,
  telefone: z
    .string()
    .min(11, 'O telefone possui menos de 21 caracteres')
    .min(1, 'O telefone é obrigatório'),
})
