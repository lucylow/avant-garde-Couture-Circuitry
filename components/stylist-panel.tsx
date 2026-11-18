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
    <div className="space-y-3">
      <label htmlFor="concept" className="flex flex-col">
        <span className="eyebrow text-primary">Styliste IA</span>
        <span className="text-xs text-muted-foreground">AI stylist — describe a concept</span>
      </label>
      <textarea
        id="concept"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        placeholder="e.g. a constellation gown with stars along the hem"
        className="w-full resize-none rounded-sm border border-border bg-background p-2.5 text-sm"
        rows={2}
      />
      <button
        type="button"
        disabled={busy || !concept.trim()}
        onClick={ask}
        className="eyebrow w-full rounded-sm border border-primary py-2.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
      >
        {busy ? 'Création en cours…' : 'Proposer un motif'}
      </button>
      {message && (
        <p className="font-display text-base italic text-muted-foreground" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  )
}
