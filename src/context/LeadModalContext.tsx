'use client'

import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react'

type LeadModalContextType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined)

export function useLeadModal() {
  const context = useContext(LeadModalContext)
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider')
  }
  return context
}

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    athleteName: '',
    athleteAge: '',
    inquiryType: 'Baseball / Softball Programs',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
  })

  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openModal = () => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setIsOpen(true)
    setIsSuccess(false)
    setIsSubmitting(false)
    setSubmitError(null)
    setFormData({
      athleteName: '',
      athleteAge: '',
      inquiryType: 'Baseball / Softball Programs',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
    })
  }

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSubmitError(null)
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const modal = modalRef.current
    if (!modal) return

    const focusable = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = focusable[0]
    first?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return

      const active = document.activeElement as HTMLElement
      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]

      if (event.shiftKey && active === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && active === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isSuccess, closeModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Submission failed')

      const savedLeads = JSON.parse(localStorage.getItem('nsec_leads') || '[]')
      savedLeads.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      })
      localStorage.setItem('nsec_leads', JSON.stringify(savedLeads))

      setIsSubmitting(false)
      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
      setSubmitError(
        'Something went wrong submitting your request. Please try again or call us at (267) 288-7053.',
      )
    }
  }

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div
            className="absolute inset-0 bg-ink-black/85 backdrop-blur-md transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-md border border-steel-300/20 bg-ink-black p-8 text-paper-white"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 min-h-11 min-w-11 p-2 text-paper-white/50 transition-colors hover:text-paper-white"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6 text-center">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Newtown Sports &amp; Events Center
                  </p>
                  <h3
                    id="lead-modal-title"
                    className="mt-1 font-display text-2xl font-extrabold tracking-tight text-paper-white lg:text-3xl"
                  >
                    Book Your Free Intro Session
                  </h3>
                  <p className="mt-2 text-sm text-paper-white/70">
                    Enter your details below and a coach will contact you to schedule your session.
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="mb-4 rounded-md border border-accent/40 bg-accent-tint px-4 py-3 text-sm text-paper-white"
                  >
                    {submitError}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="athleteName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper-white/60">
                        Athlete&apos;s Name
                      </label>
                      <input
                        type="text"
                        id="athleteName"
                        required
                        value={formData.athleteName}
                        onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none transition-colors focus:border-accent/80"
                      />
                    </div>
                    <div>
                      <label htmlFor="athleteAge" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper-white/60">
                        Athlete&apos;s Age
                      </label>
                      <input
                        type="number"
                        id="athleteAge"
                        required
                        min="5"
                        max="25"
                        value={formData.athleteAge}
                        onChange={(e) => setFormData({ ...formData, athleteAge: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none transition-colors focus:border-accent/80"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper-white/60">
                      What are you reaching about?
                    </label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none transition-colors focus:border-accent/80"
                    >
                      <option value="Baseball / Softball Programs" className="bg-ink-black text-paper-white">Baseball / Softball Programs</option>
                      <option value="Event Space Rentals" className="bg-ink-black text-paper-white">Event Space Rentals</option>
                      <option value="Sports Equipment Rentals" className="bg-ink-black text-paper-white">Sports Equipment Rentals</option>
                      <option value="General Question" className="bg-ink-black text-paper-white">General Question</option>
                      <option value="Other" className="bg-ink-black text-paper-white">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="parentName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper-white/60">
                      Parent&apos;s Name
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none transition-colors focus:border-accent/80"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="parentEmail" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper-white/60">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="parentEmail"
                        required
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none transition-colors focus:border-accent/80"
                      />
                    </div>
                    <div>
                      <label htmlFor="parentPhone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper-white/60">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none transition-colors focus:border-accent/80"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-8 py-3.5 font-display text-lg font-semibold text-paper-white transition-colors hover:bg-accent-deep disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-paper-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Send My Booking Request</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M3.75 9h10.5M10 5.25L13.75 9 10 12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent/10 text-accent">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-paper-white lg:text-3xl">
                  You&apos;re in the lineup!
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-paper-white/80">
                  We&apos;ve received your request! A member of the NSEC team will contact you at{' '}
                  <span className="font-semibold text-paper-white">{formData.parentPhone}</span>{' '}
                  within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-steel-700/50 px-6 py-2 text-sm font-semibold text-paper-white transition-colors hover:bg-steel-700"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  )
}
