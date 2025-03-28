'use client'
import { ButtonDefault } from '@/components/Button/Button'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { loginSchema } from '@/providers/utils/zod/login'

export const ClientPageLogin = () => {
  const handleRegister = (data: unknown) => {
    console.log(data)
  }

  return (
    <div>
      <DefaultForm
        schema={loginSchema}
        onSubmit={handleRegister}
        fields={[
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
        ]}
        childrenButton="Continuar"
      />
      <ButtonDefault href={'/forgetPassword'} variant="link">
        Esqueceu sua senha?
      </ButtonDefault>
    </div>
  )
}
