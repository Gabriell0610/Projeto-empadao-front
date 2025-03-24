/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError, useForm } from 'react-hook-form'
import { TypeOf, ZodSchema } from 'zod'
import { InputField } from '../InputField/InputField'

interface FormProps<T extends ZodSchema<any>> {
  schema: T
  onSubmit: (data: TypeOf<T>) => void
  fields: {
    name: keyof TypeOf<T> // o name tem que ser o que existe no schema, pois o useForm tem que saber exatamente o tipo de nome que está no schem
    label: string
    type?: string
    placeholder: string
  }[]
  buttonName?: string
}

export function DefaultForm<T extends ZodSchema<any>>({
  schema,
  onSubmit,
  fields,
  buttonName,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {fields.map(({ name, label, type, placeholder }) => (
        <InputField
          key={name as string}
          label={label}
          name={name as string}
          register={register}
          placeholder={placeholder}
          type={type || 'text'}
          error={errors[name] as FieldError | undefined}
        />
      ))}
      <button
        className="mt-5 bg-primary-greenLight px-4 py-2 text-center text-neutral-white"
        type="submit"
      >
        {buttonName}
      </button>
    </form>
  )
}
