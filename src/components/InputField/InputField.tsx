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
    <div>
      <label htmlFor={name} className="">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        className=""
        placeholder={placeholder}
        type={type}
      />
      {error && <p className="">{error.message}</p>}
    </div>
  )
}
