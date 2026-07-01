'use client'

import { useId, useState, type FormEvent } from 'react'
import { trackFormConversion } from '../lib/conversion'
import { validateEvaluationForm, type FormFieldErrors } from '../lib/formValidation'
import { submitLeadToWebhook } from '../lib/submitLead'

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

function SuccessState({
  variant,
  className,
}: {
  variant: 'inline' | 'modal'
  className: string
}) {
  return (
    <div
      className={`form-shell text-center ${variant === 'inline' ? 'form-hero-shadow' : 'form-modal-shadow'} ${className}`}
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

export function EvaluationForm({
  variant = 'inline',
  onSuccess,
  className = '',
}: EvaluationFormProps) {
  const formId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormFieldErrors>({})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      reachingOutAbout: String(formData.get('reachingOutAbout') ?? '').trim(),
    }

    const validationErrors = validateEvaluationForm(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setSubmitting(true)

    try {
      await submitLeadToWebhook(data)
      trackFormConversion(data)
      form.reset()
      setSubmitted(true)
      onSuccess?.()
    } catch {
      setErrors({
        form: 'Something went wrong. Please try again or call (267) 288-7053.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return <SuccessState variant={variant} className={className} />
  }

  const isModal = variant === 'modal'
  const shadowClass = isModal ? 'form-modal-shadow' : 'form-hero-shadow'

  return (
    <form
      id={isModal ? 'nsec-evaluation-form-modal' : 'nsec-evaluation-form'}
      data-conversion-form="true"
      data-meta-event="Lead"
      data-ghl-form="nsec-evaluation"
      onSubmit={handleSubmit}
      className={`form-shell ${shadowClass} ${className}`}
      noValidate
    >
      <p className="font-display text-xl font-bold tracking-tight text-ink-black lg:text-2xl">
        Book Your Free Evaluation
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-black/60">
        No cost. No equipment needed. 30 minutes with a real coach.
      </p>

      {errors.form && (
        <p className="mt-4 rounded-[9px] border border-accent/30 bg-accent-tint px-4 py-3 text-sm text-accent-deep" role="alert">
          {errors.form}
        </p>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
        <div className="form-field">
          <label htmlFor={`${formId}-firstName`} className="form-label">
            First Name
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            className="form-control"
          />
          {errors.firstName && <p className="form-error">{errors.firstName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-lastName`} className="form-label">
            Last Name
          </label>
          <input
            id={`${formId}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            className="form-control"
          />
          {errors.lastName && <p className="form-error">{errors.lastName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-email`} className="form-label">
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className="form-control"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-phone`} className="form-label">
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className="form-control"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-athleteAge`} className="form-label">
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
            aria-invalid={Boolean(errors.athleteAge)}
            className="form-control"
          />
          {errors.athleteAge && <p className="form-error">{errors.athleteAge}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-reachingOutAbout`} className="form-label whitespace-nowrap">
            What are you reaching out about?
          </label>
          <select
            id={`${formId}-reachingOutAbout`}
            name="reachingOutAbout"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.reachingOutAbout)}
            className="form-control form-select"
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
          {errors.reachingOutAbout && <p className="form-error">{errors.reachingOutAbout}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        data-cta="book-evaluation"
        className="form-submit"
      >
        {submitting ? 'Submitting…' : 'Book My Free Evaluation'}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-ink-black/50">
        By continuing, you agree to receive SMS updates from NSEC.
      </p>
    </form>
  )
}
