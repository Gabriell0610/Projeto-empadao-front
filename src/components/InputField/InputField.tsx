/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputsFieldsProps {
  label: string
  name: string
  register: UseFormRegister<any>
  error?: FieldError
  placeholder: string
  type?: string
}

export function InputField({
  label,
  name,
  register,
  error,
  placeholder,
  type,
}: InputsFieldsProps) {
  return (
    <div className="my-2 flex w-full flex-col">
      <label htmlFor={name} className="text-text-primary">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        className="rounded-sm border border-text-secondary px-4 py-2 focus:outline-none"
        placeholder={placeholder}
        type={type}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  )
}
