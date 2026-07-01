'use client'

import { useId, useState, type FormEvent } from 'react'
import { trackFormConversion } from '../lib/conversion'

const INTEREST_OPTIONS = [
  { value: 'baseball', label: 'Baseball' },
  { value: 'softball', label: 'Softball' },
  { value: 'hittrax', label: 'HitTrax' },
  { value: 'team', label: 'Team' },
] as const

type EvaluationFormProps = {
  variant?: 'inline' | 'modal'
  onSuccess?: () => void
  className?: string
}

export function EvaluationForm({
  variant = 'inline',
  onSuccess,
  className = '',
}: EvaluationFormProps) {
  const formId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    const form = event.currentTarget
    const formData = new FormData(form)

    const data = {
      firstName: String(formData.get('firstName') ?? '').trim(),
      lastName: String(formData.get('lastName') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      athleteAge: String(formData.get('athleteAge') ?? '').trim(),
      interest: String(formData.get('interest') ?? '').trim(),
    }

    setSubmitting(true)
    trackFormConversion(data)
    setSubmitted(true)
    setSubmitting(false)
    onSuccess?.()
  }

  if (submitted) {
    return (
      <div
        className={`rounded-sm border border-accent/30 bg-paper-white p-8 text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-2xl font-bold tracking-tight text-ink-black">
          You&rsquo;re on deck.
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-black/70">
          Thanks — we&rsquo;ll reach out shortly to schedule your free evaluation.
        </p>
      </div>
    )
  }

  const isModal = variant === 'modal'

  return (
    <form
      id={isModal ? 'nsec-evaluation-form-modal' : 'nsec-evaluation-form'}
      data-conversion-form="true"
      data-meta-event="Lead"
      data-ghl-form="nsec-evaluation"
      onSubmit={handleSubmit}
      className={`rounded-sm bg-paper-white p-6 shadow-[0_24px_64px_rgba(10,11,13,0.18)] ring-1 ring-ink-black/8 lg:p-8 ${className}`}
      noValidate
    >
      <p className="font-display text-xl font-bold tracking-tight text-ink-black lg:text-2xl">
        Book Your Free Evaluation
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-black/60">
        No cost. No equipment needed. 30 minutes with a real coach.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-firstName`} className="mb-1.5 block text-sm font-medium text-ink-black">
            First Name
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full min-h-11 rounded-sm border border-ink-black/15 bg-paper-white px-3 py-2.5 text-base text-ink-black placeholder:text-steel-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-lastName`} className="mb-1.5 block text-sm font-medium text-ink-black">
            Last Name
          </label>
          <input
            id={`${formId}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className="w-full min-h-11 rounded-sm border border-ink-black/15 bg-paper-white px-3 py-2.5 text-base text-ink-black placeholder:text-steel-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium text-ink-black">
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full min-h-11 rounded-sm border border-ink-black/15 bg-paper-white px-3 py-2.5 text-base text-ink-black placeholder:text-steel-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium text-ink-black">
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full min-h-11 rounded-sm border border-ink-black/15 bg-paper-white px-3 py-2.5 text-base text-ink-black placeholder:text-steel-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-athleteAge`} className="mb-1.5 block text-sm font-medium text-ink-black">
            Athlete Age
          </label>
          <input
            id={`${formId}-athleteAge`}
            name="athleteAge"
            type="number"
            min={6}
            max={25}
            required
            inputMode="numeric"
            className="w-full min-h-11 rounded-sm border border-ink-black/15 bg-paper-white px-3 py-2.5 text-base text-ink-black placeholder:text-steel-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-interest`} className="mb-1.5 block text-sm font-medium text-ink-black">
            What are you reaching out about?
          </label>
          <select
            id={`${formId}-interest`}
            name="interest"
            required
            defaultValue=""
            className="w-full min-h-11 rounded-sm border border-ink-black/15 bg-paper-white px-3 py-2.5 text-base text-ink-black focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="" disabled>
              Select one
            </option>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        data-cta="book-evaluation"
        className="mt-6 flex w-full min-h-11 items-center justify-center rounded-sm bg-accent px-8 py-4 font-display text-lg font-semibold text-paper-white transition-colors hover:bg-accent-deep disabled:opacity-70"
      >
        {submitting ? 'Submitting…' : 'Book My Free Evaluation'}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-ink-black/50">
        By continuing, you agree to receive SMS updates from NSEC.
      </p>
    </form>
  )
}
