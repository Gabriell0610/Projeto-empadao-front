'use client'
import { SomeChildrenInterface } from '@/types/layout.type'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { FiChevronLeft } from 'react-icons/fi'

interface LayoutProps extends SomeChildrenInterface {
  imageUrl?: StaticImageData
  altImage: string
  title: string
}

export const AuthLayout = ({
  children,
  imageUrl,
  altImage,
  title,
}: LayoutProps) => {
  const navigate = useRouter()
  return (
    <main className="flex h-screen flex-col items-center justify-center md:flex-row">
      <section className="w-full lg:w-1/2">
        <div className="relative mx-auto flex w-full max-w-[500px] flex-col justify-center overflow-auto px-8 py-8 md:max-w-[500px]">
          <div className="fixed left-4 top-12 sm:absolute sm:left-[-4px] sm:top-7">
            <FiChevronLeft
              size={32}
              className="cursor-pointer"
              onClick={() => navigate.back()}
              title="Voltar"
            />
          </div>
          <h1 className="mb-3 text-lg font-semibold text-text-primary">
            {title}
          </h1>
          {children}
        </div>
      </section>

      <div className="relative hidden h-screen w-1/2 lg:block">
        <Image
          src={imageUrl || ''}
          alt={altImage}
          fill
          priority
          quality={100}
        />
      </div>
    </main>
  )
}
