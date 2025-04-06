'use client'
import { ButtonDefault } from '@/components/Button/Button'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { RegisterData, registerSchema } from '@/utils/zod/register'

export const ClientPageRegister = () => {
  const handleRegister = (data: RegisterData) => {
    console.log(data)
  }

  return (
    <div>
      <DefaultForm
        schema={registerSchema}
        onSubmit={handleRegister}
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
      <p>
        Já tem uma conta?{' '}
        <ButtonDefault href={'/login'} variant={'link'}>
          {'login'}
        </ButtonDefault>
      </p>
    </div>
  )
}
