'use client'

import { LoadingComponent } from '@/components/Loading/LoadingComponent'
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'

export default function ClientPage() {
  const { data: session } = useSession()
  const { isLoading, setIsLoading } = useContext(LoadingContext)

  if (!session) {
    setIsLoading(true)
  } else {
    setIsLoading(false)
  }

  return (
    <>
      <h2>
        Página onde o usuário vai pode escolher os itens e colocar no carrinho
      </h2>
      <div>
        <h1>Bem-vindo {session?.user.email}</h1>
        <p>ID: {session?.user.id}</p>
        <p>Role: {session?.user.role}</p>
        <p>Token: {session?.user.accessToken}</p>
      </div>
      {isLoading && <LoadingComponent mode={'fullScreen'} />}
    </>
  )
}
