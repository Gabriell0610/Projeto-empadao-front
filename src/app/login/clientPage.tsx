'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { loginSchema } from '@/providers/utils/zod/login'
import Link from 'next/link'

export const ClientPageLogin = () => {
  const handleRegister = (data: unknown) => {
    console.log(data)
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-semibold text-text-primary">
        Acesse sua conta e faça seus pedidos!
      </h1>
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
        buttonName="Continuar"
      />
      <p>
        <Link
          href={'/updatePassword'}
          className="pb-3 font-semibold text-primary-greenLight"
        >
          Esqueceu sua senha?
        </Link>
      </p>
    </div>
  )
}
