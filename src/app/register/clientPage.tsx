'use client'
import { ButtonDefault } from '@/components/Button/Button'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { useRegister } from '@/hooks/useRegister/useRegister'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import { RegisterData, registerSchema } from '@/utils/zod/register.schema'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import toast from 'react-hot-toast'

export const ClientPageRegister = () => {
  const route = useRouter()
  const { register } = useRegister()
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const handleRegister = async (data: RegisterData) => {
    try {
      setIsLoading(true)
      const res = await register(data)
      // console.log(res)

      if (!res.success) {
        toast.error(res.message)
        setIsLoading(false)
      } else {
        toast.success(res.message)
        setIsLoading(false)
        route.push('/login')
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <DefaultForm
        schema={registerSchema}
        onSubmit={handleRegister}
        isLoading={isLoading}
        fields={[
          {
            name: 'nome',
            label: 'Nome Completo',
            placeholder: 'Digite seu nome completo',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Digite seu email',
          },
          {
            name: 'senha',
            label: 'Senha',
            type: 'password',
            placeholder: 'Digite sua senha',
          },
          {
            name: 'telefone',
            label: 'Telefone',
            type: 'number',
            placeholder: 'Digite seu telefone',
          },
        ]}
        childrenButton="Continuar"
      />
      <div className="mt-5 flex justify-center">
        <p>
          Já tem uma conta?{' '}
          <ButtonDefault href={'/login'} variant={'link'}>
            {'login'}
          </ButtonDefault>
        </p>
      </div>
    </div>
  )
}
