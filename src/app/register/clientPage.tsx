'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { registerSchema } from '@/providers/utils/zod/register'

export const ClientPageRegister = () => {
  const handleRegister = (data: unknown) => {
    console.log(data)
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-text-primary">
        Crie sua conta e aproveite uma experiência personalizada!
      </h1>
      <DefaultForm
        schema={registerSchema}
        onSubmit={handleRegister}
        fields={[
          {
            name: 'nome',
            label: 'Nome e Sobrenome',
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
        buttonName="Continuar"
      />
    </div>
  )
}
