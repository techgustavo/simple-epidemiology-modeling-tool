'use client'

import { useState } from 'react'
import { Input } from './Input'
import { useValues } from '@/contexts/values'
import { sirdParams } from '@/utils/sirdModel'

export const Form = () => {
  const [formData, setFormData] = useState({
    recovered: 0,
    dead: 0,
  } as sirdParams)

  const { setValue } = useValues()

  return (
    <form
      className="flex flex-col items-center justify-center gap-6 pb-16 align-middle"
      id="Form"
    >
      <div className="flex gap-5">
        <Input
          name="beta"
          placeholder="1"
          label="&Beta; (infection rate)"
          required
          onChange={(e) => {
            setFormData({ ...formData, beta: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="gamma"
          placeholder="0.3"
          label="&Gamma; (recovery rate)"
          required
          onChange={(e) => {
            setFormData({ ...formData, gamma: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="mu"
          placeholder="0.1"
          label="&Mu; (death rate)"
          required
          onChange={(e) => {
            setFormData({ ...formData, mu: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="population"
          placeholder="1000"
          label="Population"
          required
          onChange={(e) => {
            setFormData({ ...formData, population: parseFloat(e.target.value) })
          }}
        />
      </div>
      <div className="flex gap-5">
        <Input
          name="infected"
          placeholder="1"
          label="Infected"
          required
          onChange={(e) => {
            setFormData({ ...formData, infected: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="recovered"
          placeholder="100"
          label="Recovered (optional)"
          onChange={(e) => {
            setFormData({
              ...formData,
              recovered: !isNaN(parseFloat(e.target.value))
                ? parseFloat(e.target.value)
                : 0,
            })
          }}
        />
        <Input
          name="deceased"
          placeholder="300"
          label="Deceased (optional)"
          onChange={(e) => {
            setFormData({
              ...formData,
              dead: !isNaN(parseFloat(e.target.value))
                ? parseFloat(e.target.value)
                : 0,
            })
          }}
        />
        <Input
          name="days"
          placeholder="50"
          label="Days"
          required
          onChange={(e) => {
            setFormData({ ...formData, days: parseFloat(e.target.value) })
          }}
        />
      </div>
      <button
        className="w-1/4 rounded border border-gray-600 px-3 py-2 text-gray-600 transition-colors duration-75 hover:bg-gray-100"
        onClick={(e) => {
          const form = document.getElementById('Form') as HTMLFormElement | null
          if (form) {
            const validity = form.checkValidity()
            if (validity) {
              setValue(formData)
              e.preventDefault()
            }
          }
        }}
      >
        Send
      </button>
    </form>
  )
}
