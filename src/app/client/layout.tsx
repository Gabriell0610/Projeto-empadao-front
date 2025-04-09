import { SomeChildrenInterface } from '@/utils/types/layout.type'

export default function ClientLayout({ children }: SomeChildrenInterface) {
  return (
    <>
      <header>
        Toda página de cliente vai ter esse header quando o login for feito para
        acessar as outras páginas
      </header>
      {children}
    </>
  )
}
