'use client'
import { ButtonDefault } from '@/components/Button/Button'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { loginDto, loginSchema } from '@/utils/zod/login'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const ClientPageLogin = () => {
  const router = useRouter()

  const handleLogin = async (data: loginDto) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      console.log('login response: ', res)
      if (!res?.error) {
        const session = await getSession() // Pega a session atualizada do usuário logado

        if (session?.user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/client')
        }
      } else {
        // AQUI VAI SER LANÇADO O MODAL COM O ERRO - EMAIL OU USUÁRIO INVÁLIDOS
        console.log('ERROR', res.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <DefaultForm
        schema={loginSchema}
        onSubmit={handleLogin}
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
      <ButtonDefault href={'/forgetPassword'} variant="link">
        Esqueceu sua senha?
      </ButtonDefault>
    </div>
  )
}
