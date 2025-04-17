/* eslint-disable prettier/prettier */
import { ClientPageNewPassword } from './clientPage'
import imageForgetPassword from '../../../public/image_forget.png'
import { AuthLayout } from '@/components/AuthLayout/AuthLayout'
export default function NewPasswordPage() {
  return (
    <>
    <AuthLayout altImage='Uma pessoa confusa e pensando na senha perdida' imageUrl={imageForgetPassword} title={'Adicione uma nova senha!'}>
      <ClientPageNewPassword/>
    </AuthLayout>
    </>
  )
}
