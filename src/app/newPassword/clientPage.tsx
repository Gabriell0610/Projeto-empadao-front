'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { useForgetPassword } from '@/hooks/useForgetPassword'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import {
  resetPasswordSchema,
  resetPasswordDto,
} from '@/utils/zod/forgetPassword'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import toast from 'react-hot-toast'

export interface NewPasswordData {
  newPassword: string
  email: string
  token: string
}

export const ClientPageNewPassword = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { resetPassword } = useForgetPassword()
  const router = useRouter()

  const userEmail = localStorage.getItem('userEmail')
  const token = localStorage.getItem('userToken')

  const handleNewPassword = async (data: resetPasswordDto) => {
    try {
      setIsLoading(true)

      const dataToSend: NewPasswordData = {
        email: userEmail as string,
        newPassword: data.newPassword,
        token: token as string,
      }

      const res = await resetPassword(dataToSend)

      if (!res.success) {
        toast.error(res.message)
        setIsLoading(false)
      } else {
        toast.success('Senha alterada com sucesso!')
        setIsLoading(false)
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <DefaultForm
        schema={resetPasswordSchema}
        onSubmit={handleNewPassword}
        isLoading={isLoading}
        fields={[
          {
            name: 'newPassword',
            label: 'Nova Senha',
            type: 'password',
            placeholder: 'Digite sua senha',
          },
          {
            name: 'samePassword',
            label: 'Repita a senha novamente',
            type: 'password',
            placeholder: 'Digite sua senha novamente',
          },
        ]}
        childrenButton={'Salvar'}
      />
    </div>
  )
}
