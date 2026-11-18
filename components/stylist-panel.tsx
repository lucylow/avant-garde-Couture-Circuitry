'use client'

import { useState, useTransition } from 'react'
import { suggestLayout, type Suggestion } from '@/app/actions/stylist'

export function StylistPanel({ onSuggest }: { onSuggest: (s: Suggestion) => void }) {
  const [concept, setConcept] = useState('')
  const [message, setMessage] = useState('')
  const [busy, startTransition] = useTransition()

  const ask = () =>
    startTransition(async () => {
      setMessage('')
      try {
        const r = await suggestLayout(concept)
        if (r.error) setMessage(r.error)
        else {
          onSuggest(r)
          setMessage(r.note)
        }
      } catch {
        setMessage("The stylist couldn't answer. Try again.")
      }
    })

  return (
    <div className="space-y-2 rounded-xl border p-3">
      <label htmlFor="concept" className="block font-semibold">
        AI Stylist
      </label>
      <textarea
        id="concept"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        placeholder="e.g. a constellation gown with stars along the hem"
        className="w-full rounded-md border bg-background p-2 text-xs"
        rows={2}
      />
      <button
        type="button"
        disabled={busy || !concept.trim()}
        onClick={ask}
        className="w-full rounded-lg bg-primary py-1.5 text-primary-foreground disabled:opacity-50"
      >
        {busy ? 'Designing…' : 'Suggest layout'}
      </button>
      {message && (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  )
}
