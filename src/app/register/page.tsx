/* eslint-disable prettier/prettier */
import { ClientPageRegister } from './clientPage'
import imageRegister from '../../../public/image_register.png'
import { AuthLayout } from '@/components/AuthLayout/AuthLayout'
export default function RegisterPage() {
  return (
    <AuthLayout altImage='Desenho de duas pessoas conversando' imageUrl={imageRegister} title={'Crie sua conta e aproveite uma experiência personalizada!'}>
      <ClientPageRegister/>
    </AuthLayout>
  )
}
