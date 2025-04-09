/* eslint-disable @typescript-eslint/no-unused-vars */
import { twMerge } from 'tailwind-merge'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { LoadingComponentInterface } from '@/utils/types/components/loadingComponent'
import colors from 'tailwindcss/colors'

export const LoadingComponent = ({
  size = 60,
  mode,
}: LoadingComponentInterface) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-full items-center justify-center',
        'z-1 absolute inset-0',
      )}
    >
      <AiOutlineLoading3Quarters
        size={size}
        className="animate-spin"
        color={colors.green[500]}
      />
    </div>
  )
}
