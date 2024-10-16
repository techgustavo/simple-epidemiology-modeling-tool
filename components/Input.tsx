import React, { FC } from 'react'

interface InputFieldProps {
  label: string
  placeholder?: string
  required?: boolean
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputFieldProps> = ({
  label,
  placeholder,
  required = false,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 block text-base text-gray-600">{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        min={0}
        step={'any'}
        className="rounded border border-gray-600 px-3 py-2 text-gray-600"
        required={required}
        onChange={onChange}
      />
    </div>
  )
}
