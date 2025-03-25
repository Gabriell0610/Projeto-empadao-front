import { SomeChildrenInterface } from '@/types/layout.type'
import Image, { StaticImageData } from 'next/image'

interface LayoutProps extends SomeChildrenInterface {
  imageUrl: StaticImageData
  altImage: string
}

export const AuthLayout = ({ children, imageUrl, altImage }: LayoutProps) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center md:flex-row">
      <section className="flex w-full md:w-1/2">
        <div className="mx-auto flex w-full justify-center overflow-auto px-8 py-8 md:max-w-[550px]">
          {children}
        </div>
      </section>

      <div className="relative hidden h-screen w-full md:block md:w-1/2">
        <Image src={imageUrl} alt={altImage} fill priority quality={100} />
      </div>
    </main>
  )
}
