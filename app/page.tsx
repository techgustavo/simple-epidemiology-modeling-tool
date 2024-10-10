'use client'
import { useEffect } from 'react'
import { sirModel } from '../utils/sirdModel'

export default function Home() {
  useEffect(() => {
    const { s, i, r, d, p } = sirModel({
      beta: 1,
      gamma: 0.3,
      mu: 0.1,
      population: 1000,
      infected: 1,
      recovered: 0,
      days: 100,
    })
    console.log('Infectious', i)
    console.log('Recovered', r)
    console.log('Susceptible', s)
    console.log('Dead', d)
    console.log('Population', p)
  }, [])

  return (
    <div className="flex min-w-full items-center justify-center p-8">
      Hello, world!
    </div>
  )
}
