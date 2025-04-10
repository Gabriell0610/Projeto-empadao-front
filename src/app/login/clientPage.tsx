'use client'
import { ButtonDefault } from '@/components/Button/Button'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
// import { LoadingComponent } from '@/components/Loading/LoadingComponent'
import { AccessProfile } from '@/constants/enums/accessProfile'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import { loginDto, loginSchema } from '@/utils/zod/login.schema'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export const ClientPageLogin = () => {
  const router = useRouter()

  const { isLoading, setIsLoading } = useContext(LoadingContext)

  const handleLogin = async (data: loginDto) => {
    try {
      setIsLoading(true)
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      console.log('login response: ', res)
      if (!res?.error) {
        const session = await getSession() // Pega a session atualizada do usuário logado

        if (session?.user.role === AccessProfile.ADMIN) {
          router.push('/admin')
        } else {
          router.push('/client')
        }
      } else {
        // AQUI VAI SER LANÇADO O MODAL COM O ERRO - EMAIL OU USUÁRIO INVÁLIDOS
        console.log('ERROR', res.error)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <DefaultForm
        schema={loginSchema}
        onSubmit={handleLogin}
        isLoading={isLoading}
        fields={[
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Digite seu email',
          },
          {
            name: 'password',
            label: 'Senha',
            type: 'password',
            placeholder: 'Digite sua senha',
          },
        ]}
        childrenButton="Entrar"
      />

      <ButtonDefault
        href={'/forgetPassword'}
        variant="link"
        isLoading={isLoading}
      >
        Esqueceu sua senha?
      </ButtonDefault>
    </div>
  )
}
