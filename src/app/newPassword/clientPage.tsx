'use client'
import { DefaultForm } from '@/components/DefaultForm/DefaultForm'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import {
  resetPasswordSchema,
  resetPasswordDto,
} from '@/utils/zod/forgetPassword'
import { useContext, useState } from 'react'

export const ClientPageNewPassword = () => {
  const [tokenGenerated, setTokenGenerated] = useState(false)
  const { isLoading, setIsLoading } = useContext(LoadingContext)

  const handleNewPassword = (data: resetPasswordDto) => {
    console.log(data)
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
        childrenButton={!tokenGenerated ? 'Gerar Token' : 'Continuar'}
      />
    </div>
  )
}
