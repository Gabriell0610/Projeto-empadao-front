import { SessionProvider } from '@/providers/sessionProvider'
import { SomeChildrenInterface } from '@/types/layout.type'

export default function ClientLayout({ children }: SomeChildrenInterface) {
  return (
    <>
      <header>
        Toda página de cliente vai ter esse header quando o login for feito
      </header>
      <SessionProvider>{children}</SessionProvider>
    </>
  )
}
