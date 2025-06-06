import '../../theme/globals.css'
import type { Metadata } from 'next'
import { SomeChildrenInterface } from '@/types/layout.type'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: SomeChildrenInterface) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`antialiased`}>
        {children}
      </body>
    </html>
  )
}
