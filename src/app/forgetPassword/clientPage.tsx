'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { useForgetPassword } from '@/hooks/useForgetPassword'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import {
  sendEmailDto,
  sendEmailSchema,
  validateTokenDto,
  validateTokenSchema,
} from '@/utils/zod/forgetPassword'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

export const ClientPageForgetPassword = () => {
  const [tokenNotGenerated, setTokenNotGenerated] = useState(true)
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { generateToken, validateToken } = useForgetPassword()
  const router = useRouter()

  const handleGenerateToken = async (data: sendEmailDto) => {
    try {
      setIsLoading(true)
      const res = await generateToken(data)

      if (!res.success) {
        setIsLoading(false)
        toast.error(res.message)
      } else {
        setTokenNotGenerated(false)
        toast.success(res.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleValidateToken = async (data: validateTokenDto) => {
    try {
      setIsLoading(true)
      console.log(data.email)
      const res = await validateToken(data)

      if (!res.success) {
        setTokenNotGenerated(true)
        toast.error(res.message)
        setIsLoading(false)
      } else {
        toast.success('Aguarde ser redirecionado!')
        router.push('/newPassword')
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('userToken', data.token)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      {tokenNotGenerated ? (
        <div>
          <p>
            Informe seu email para gerar um token de segurança. Fique atento ao
            seu email!
          </p>
          <DefaultForm
            schema={sendEmailSchema}
            onSubmit={handleGenerateToken}
            isLoading={isLoading}
            fields={[
              {
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Digite seu email',
              },
            ]}
            childrenButton={'Gerar Token'}
          />
        </div>
      ) : (
        <div>
          <p>Coloque o token que você recebeu no seu email no campo abaixo!</p>
          <DefaultForm
            schema={validateTokenSchema}
            onSubmit={handleValidateToken}
            isLoading={isLoading}
            fields={[
              {
                name: 'token',
                label: 'Token',
                type: 'number',
                placeholder: 'Digite seu token',
              },
            ]}
            childrenButton={'Continuar'}
          />
        </div>
      )}
    </>
  )
}
