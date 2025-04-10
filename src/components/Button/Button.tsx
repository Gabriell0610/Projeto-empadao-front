/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import { LoadingComponent } from '../Loading/LoadingComponent'

type ButtonProps = ComponentProps<'button'>
type VariantButton = 'primary' | 'secondary' | 'link'

interface ButtonInterface extends ButtonProps {
  variant?: VariantButton
  icon?: IconType
  href?: string
  isLoading?: boolean
}

export const ButtonDefault = ({
  type,
  children,
  href,
  icon,
  variant,
  onClick = () => null,
  isLoading,
  disabled,
  className,
  ...rest
}: ButtonInterface) => {
  const isLink = variant === 'link'
  const isPrimary = variant === 'primary'
  const isSecondary = variant === 'secondary'

  if (isLink) {
    return (
      <Link
        href={href || ''}
        className={twMerge(
          isLoading
            ? 'pointer-events-none cursor-not-allowed pb-3 text-primary-greenLight opacity-50'
            : 'pb-3 text-primary-greenLight',
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={twMerge(
        isPrimary
          ? 'mt-5 bg-primary-greenLight px-4 py-2 text-center text-neutral-white'
          : '',
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingComponent size={20} />
          {'carregando...'}
        </div>
      ) : (
        children
      )}
    </button>
  )
}
