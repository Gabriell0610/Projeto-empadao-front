/* eslint-disable prettier/prettier */
'use client';
import { SomeChildrenInterface } from '@/utils/types/layout.type';
import Image, { StaticImageData } from 'next/image';
import { twMerge } from 'tailwind-merge';

interface LayoutProps extends SomeChildrenInterface {
  imageUrl?: StaticImageData;
  altImage: string;
  title: string;
  mode?: string;
}

export const AuthLayout = ({
  children,
  imageUrl,
  altImage,
  title,
  mode,
}: LayoutProps) => {
  // const navigate = useRouter();
  return (
    <main className="flex h-screen flex-col md:flex-row">
      {/* Seção do formulário */}
      <section className="flex flex-1 flex-col items-center justify-center overflow-y-auto lg:w-1/2">
        <div className="mx-auto w-full max-w-[600px] px-8 py-2 md:max-w-[500px]">
          <h1 className="mt-11 text-start text-lg font-semibold text-text-primary">
            {title}
          </h1>
          {children}
        </div>
      </section>

      {/* Imagem fixa à direita */}
      <div className="relative hidden h-screen w-1/2 flex-1 md:flex">
        <Image
          src={imageUrl || ''}
          alt={altImage}
          fill
          priority
          quality={100}
          className={twMerge(
            mode === 'register' ? 'object-cover' : 'object-contain',
          )}
        />
      </div>
    </main>
  );
};
