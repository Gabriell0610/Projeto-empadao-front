import { SomeChildrenInterface } from '@/utils/types/layout.type'

export default function AdminLayout({ children }: SomeChildrenInterface) {
  return (
    <>
      <h1>
        A rota de admin vai ter um menu lateral com as rotas necessárias
        como:{' '}
      </h1>
      <ul>
        <li>Pedidos</li>
        <li>Produtos</li>
        <li>Clientes fieis</li>
        <li>Dashboard financeiro</li>
        <li></li>
      </ul>
      {children}
    </>
  )
}
