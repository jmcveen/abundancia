'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Scenario } from '@/lib/data/financials'

interface ScenarioContextValue {
  scenario: Scenario
  setScenario: (s: Scenario) => void
}

const ScenarioContext = createContext<ScenarioContextValue>({
  scenario: 'base',
  setScenario: () => {},
})

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<Scenario>('base')

  return (
    <ScenarioContext.Provider value={{ scenario, setScenario }}>
      {children}
    </ScenarioContext.Provider>
  )
}

export function useScenario() {
  return useContext(ScenarioContext)
}
