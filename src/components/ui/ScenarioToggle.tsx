'use client'

import { SCENARIOS, SCENARIO_LABELS } from '@/lib/data/financials'
import { useScenario } from '@/lib/context/scenario-context'

export function ScenarioToggle() {
  const { scenario, setScenario } = useScenario()

  return (
    <div className="inline-flex bg-primary-50 rounded-xl p-1">
      {SCENARIOS.map((s) => (
        <button
          key={s}
          onClick={() => setScenario(s)}
          className={`font-accent text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
            scenario === s
              ? 'bg-primary-800 text-white shadow-sm'
              : 'text-neutral-600 hover:text-primary-800'
          }`}
        >
          {SCENARIO_LABELS[s]}
        </button>
      ))}
    </div>
  )
}
