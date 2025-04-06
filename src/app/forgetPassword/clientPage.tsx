'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { loginSchema } from '@/utils/zod/login'

export const ClientPageForgetPassword = () => {
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
            label: 'Nova Senha',
            type: 'password',
            placeholder: 'Digite sua nova senha',
          },
        ]}
        childrenButton="Salvar"
      />
    </div>
  )
}
