'use client'

import { useState } from 'react'
import { Input } from './Input'

type FormDataType = {
  beta: number
  gamma: number
  mu: number
  population: number
  infected: number
  recovered?: number
  deceased?: number
  days: number
}

export const Form = () => {
  const [formData, setFormData] = useState({
    recovered: 0,
    deceased: 0,
  } as FormDataType)

  return (
    <form
      className="flex flex-col items-center justify-center gap-5 pb-9 align-middle"
      id="Form"
    >
      <div className="flex gap-5">
        <Input
          name="beta"
          placeholder="e.g. 0.3"
          label="&Beta; (infection rate)"
          required
          onChange={(e) => {
            setFormData({ ...formData, beta: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="gamma"
          placeholder="e.g. 0.1"
          label="&Gamma; (recovery rate)"
          required
          onChange={(e) => {
            setFormData({ ...formData, gamma: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="mu"
          placeholder="e.g. 0.5"
          label="&Mu; (death rate)"
          required
          onChange={(e) => {
            setFormData({ ...formData, mu: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="population"
          placeholder="e.g. 1000"
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
          placeholder="e.g. 1"
          label="Infected"
          required
          onChange={(e) => {
            setFormData({ ...formData, infected: parseFloat(e.target.value) })
          }}
        />
        <Input
          name="recovered"
          placeholder="e.g. 20"
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
          placeholder="e.g. 10"
          label="Deceased (optional)"
          onChange={(e) => {
            setFormData({
              ...formData,
              deceased: !isNaN(parseFloat(e.target.value))
                ? parseFloat(e.target.value)
                : 0,
            })
          }}
        />
        <Input
          name="days"
          placeholder="e.g. 30"
          label="Days"
          required
          onChange={(e) => {
            setFormData({ ...formData, days: parseFloat(e.target.value) })
          }}
        />
      </div>
      <button
        className="w-full rounded border border-gray-300 bg-gray-300 p-3 hover:bg-gray-100 hover:outline-gray-300"
        onClick={(e) => {
          const form = document.getElementById('Form') as HTMLFormElement | null
          if (form) {
            const validity = form.checkValidity()
            if (validity) {
              console.log(formData)
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
