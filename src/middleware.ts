import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequestWithAuth } from 'next-auth/middleware'
import { AccessProfile } from './constants/enums/accessProfile'
// import toast from 'react-hot-toast'

export default withAuth(function middleware(req: NextRequestWithAuth) {
  // nextUrl nativo do next
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isNewPasswordRoute = req.nextUrl.pathname.startsWith('/newPassword')

  // nextAuth só da para usar quando tem withAuth - Com o nextAuth eu consigo pegar os dados do usuário que estão no token no cookie
  const userRole = req.nextauth.token?.role
  const token = req.nextauth.token

  const isAdmin = userRole === AccessProfile.ADMIN

  // Se for rota de admin
  if (isAdminRoute) {
    // E se nao tiver token, redireciona para o home
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/client', req.url))
    }
  }

  if (isNewPasswordRoute) {
    const userEmail = req.cookies.get('userEmail')?.value
    const tokenResetPassword = req.cookies.get('userToken')?.value
    if (!userEmail || !tokenResetPassword) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Senão, libera o acesso normalmente
  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/client/:path*', '/newPassword'], // Aplica o middleware nas rotas
}
