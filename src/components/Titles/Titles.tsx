import { SomeChildrenInterface } from '@/utils/types/generics/layout.type';
import { twMerge } from 'tailwind-merge';

interface TitlesInterface extends SomeChildrenInterface {
  className?: string;
}

export const TitleH1 = ({ children, className }: TitlesInterface) => {
  return (
    <h1
      className={twMerge(
        'mb-5 text-xl font-semibold text-text-primary sm:text-3xl lg:text-4xl',
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const TitleH2 = ({ children, className }: TitlesInterface) => {
  return (
    <h2
      className={twMerge(
        'mb-2 text-lg font-semibold text-text-primary',
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const TitleH3 = ({ children, className }: TitlesInterface) => {
  return (
    <h3 className={twMerge('mb-2 font-semibold text-text-primary', className)}>
      {children}
    </h3>
  );
};
