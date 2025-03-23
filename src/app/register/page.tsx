/* eslint-disable prettier/prettier */
import { ClientPageRegister } from './clientPage'
import imageRegister from '../../../public/image_register.png'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <main className="flex h-screen flex-col md:flex-row">
      <section className="flex w-full md:w-1/2">
        <div className="flex justify-center mx-auto w-full md:max-w-[550px] overflow-auto px-8 py-8">
          <ClientPageRegister />
        </div>
      </section>

      <div className="relative h-screen w-full hidden md:w-1/2 md:block">
        <Image
          src={imageRegister}
          alt="imagem de um desenho com duas pessoas conversando"
          fill
          priority
          quality={100}
        />
      </div>
    </main>
  )
}
