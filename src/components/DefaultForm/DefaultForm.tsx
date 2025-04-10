/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError, useForm } from 'react-hook-form'
import { TypeOf, ZodSchema } from 'zod'
import { InputField } from '../InputField/InputField'
import { ButtonDefault } from '../Button/Button'

interface FormProps<T extends ZodSchema<any>> {
  schema: T
  onSubmit: (data: TypeOf<T>) => void
  fields: {
    name: keyof TypeOf<T> // o name tem que ser o que existe no schema, pois o useForm tem que saber exatamente o tipo de nome que está no schem
    label: string
    type?: string
    placeholder: string
  }[]
  childrenButton?: string
  isLoading?: boolean
}

export function DefaultForm<T extends ZodSchema<any>>({
  schema,
  onSubmit,
  fields,
  childrenButton,
  isLoading,
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
          disabled={isLoading}
        />
      ))}
      <ButtonDefault type="submit" variant="primary" isLoading={isLoading}>
        {childrenButton}
      </ButtonDefault>
    </form>
  )
}
