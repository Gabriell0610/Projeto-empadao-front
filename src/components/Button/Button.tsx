/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import { ComponentProps } from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';
import { LoadingComponent } from '../Loading/LoadingComponent';

type ButtonProps = ComponentProps<'button'>;
type VariantButton = 'primary' | 'third' | 'link' | 'secondary';

interface ButtonInterface extends ButtonProps {
  variant?: VariantButton;
  icon?: IconType;
  href?: string;
  isLoading?: boolean;
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
  const isLink = variant === 'link';
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isThird = variant === 'third';

  if (isLink) {
    return (
      <Link
        href={href || ''}
        className={twMerge(
          isLoading
            ? 'pointer-events-none cursor-not-allowed text-primary-greenLight opacity-50'
            : 'text-primary-greenLight hover:underline',
          className,
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={twMerge(
        isPrimary
          ? 'rounded-md border bg-primary-greenLight px-4 py-2 text-center font-semibold text-neutral-white hover:bg-details-greenHover'
          : isSecondary
            ? 'rounded-md border border-primary-greenLight bg-neutral-white px-4 py-2 font-semibold text-text-primary hover:opacity-80'
            : isThird
              ? 'w-full rounded border border-green-700 py-2 font-medium text-green-700 transition-colors duration-200 hover:bg-green-700 hover:text-white'
              : '',
        className,
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
  );
};
