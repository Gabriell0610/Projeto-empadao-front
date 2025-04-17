'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { useForgetPassword } from '@/hooks/useForgetPassword'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import {
  forgotPasswordSchema,
  forgotPasswordDto,
} from '@/utils/zod/forgetPassword'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

export const ClientPageForgetPassword = () => {
  const [tokenNotGenerated, setTokenNotGenerated] = useState(true)
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { generateToken, validateToken } = useForgetPassword()
  const router = useRouter()

  const handleGenerateToken = async (data: forgotPasswordDto) => {
    try {
      setIsLoading(true)
      const res = await generateToken(data.email)

      if (!res.success) {
        setIsLoading(false)
        toast.error(res.message)
      } else {
        setTokenNotGenerated(false)
        toast.success(res.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const handleValidateToken = async (data: forgotPasswordDto) => {
    try {
      setIsLoading(true)
      const res = await validateToken(data)

      if (!res.success) {
        setIsLoading(false)
        toast.error(res.message)
      } else {
        toast.success('Aguarde ser redirecionado!')
        router.push('/newPassword')
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <p>
        Informe seu email para gerar um token de segurança. Fique atento ao seu
        email!
      </p>
      <DefaultForm
        schema={forgotPasswordSchema}
        onSubmit={tokenNotGenerated ? handleGenerateToken : handleValidateToken}
        isLoading={isLoading}
        fields={[
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Digite seu email',
          },
          {
            name: 'token',
            label: 'Token',
            type: 'number',
            placeholder: 'Digite o token',
            disabled: tokenNotGenerated,
          },
        ]}
        childrenButton={tokenNotGenerated ? 'Gerar Token' : 'Continuar'}
      />
    </div>
  )
}
