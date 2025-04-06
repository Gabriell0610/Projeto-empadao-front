'use client'

import { useSession } from 'next-auth/react'

export default function ClientPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>carregando....</div>
  }
  return (
    <>
      <h2>
        Página onde o usuário vai pode escolher os itens e colocar no carrinho
      </h2>
      <div>
        <h1>Bem-vindo {session.user.email}</h1>
        <p>ID: {session.user.id}</p>
        <p>Role: {session.user.role}</p>
        <p>Token: {session.user.accessToken}</p>
      </div>
    </>
  )
}
