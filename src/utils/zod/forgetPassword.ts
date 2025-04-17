import { z } from 'zod'
import { passwordValidation } from './validations/password'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Campo obrigatório'),
  token: z.string().optional(),
})

const validateTokenSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
})

const resetPasswordSchema = z
  .object({
    newPassword: passwordValidation,
    samePassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.samePassword, {
    message: 'As senhas devem ser iguais',
    path: ['samePassword'],
  })

export type forgotPasswordDto = z.infer<typeof forgotPasswordSchema>
export type resetPasswordDto = z.infer<typeof resetPasswordSchema>

export { forgotPasswordSchema, resetPasswordSchema, validateTokenSchema }
