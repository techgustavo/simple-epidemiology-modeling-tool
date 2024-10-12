'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from 'react'
import { sirdParams } from '@/utils/sirdModel'

interface ValuesContextType {
  value: sirdParams
  setValue: React.Dispatch<React.SetStateAction<sirdParams>>
}

const ValuesContext = createContext<ValuesContextType | undefined>(undefined)

const ValuesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState({
    beta: 1,
    gamma: 0.3,
    mu: 0.1,
    population: 1000,
    infected: 1,
    days: 50,
    dead: 300,
    recovered: 100,
  } as sirdParams)

  return (
    <ValuesContext.Provider value={{ value, setValue }}>
      {children}
    </ValuesContext.Provider>
  )
}

const useValues = (): ValuesContextType => {
  const context = useContext(ValuesContext)
  if (context) {
    return context
  } else {
    throw new Error('useValues must be used within a ValuesProvider')
  }
}

export { ValuesProvider, useValues }
