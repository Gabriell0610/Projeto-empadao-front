/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import { ComponentProps } from 'react'
import { IconType } from 'react-icons'

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
        className={`pb-3 text-primary-greenLight ${className}`}
      >
        {children}
      </Link>
    )
  }

  // baixar tw-merge

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`mt-5 px-4 ${isPrimary ? 'bg-primary-greenLight' : ''} py-2 text-center text-neutral-white`}
    >
      {children}
    </button>
  )
}
