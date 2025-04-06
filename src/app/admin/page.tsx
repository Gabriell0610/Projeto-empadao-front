'use client'
import { useSession } from 'next-auth/react'

export default function PrivatePage() {
  const { data: session } = useSession()
  if (!session) {
    return <div>carregando....</div>
  }
  return (
    <>
      <h1>rota privada</h1>
      <h1>Ola: {session?.user.email}</h1>
    </>
  )
}
