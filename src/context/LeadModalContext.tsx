'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

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

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    athleteName: '',
    athleteAge: '',
    inquiryType: 'Baseball / Softball Programs',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
  })

  const openModal = () => {
    setIsOpen(true)
    setIsSuccess(false)
    setIsSubmitting(false)
    setFormData({
      athleteName: '',
      athleteAge: '',
      inquiryType: 'Baseball / Softball Programs',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
    })
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate server side request submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Save locally to localstorage as lead backup
      const savedLeads = JSON.parse(localStorage.getItem('nsec_leads') || '[]')
      savedLeads.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      })
      localStorage.setItem('nsec_leads', JSON.stringify(savedLeads))
      
      setIsSubmitting(false)
      setIsSuccess(true)
    } catch {
      setIsSubmitting(false)
    }
  }

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* Modal markup */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-ink-black/85 backdrop-blur-md transition-opacity" 
            onClick={closeModal}
          />

          {/* Modal box */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-ink-black border border-accent/20 p-8 shadow-2xl text-paper-white z-10">
            {/* Ambient glow decoration */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-accent/15 blur-[60px]" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-paper-white/50 hover:text-paper-white transition-colors"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!isSuccess ? (
              /* Lead Capture Form */
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="text-center mb-6">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Newtown Sports &amp; Events Center
                  </p>
                  <h3 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-paper-white mt-1">
                    Book Your Free Intro Session
                  </h3>
                  <p className="text-sm text-paper-white/70 mt-2">
                    Enter your details below and a coach will contact you to schedule your session.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Grid fields for Athlete Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="athleteName" className="block text-xs font-semibold uppercase tracking-wider text-paper-white/60 mb-1.5">
                        Athlete's Name
                      </label>
                      <input
                        type="text"
                        id="athleteName"
                        required
                        value={formData.athleteName}
                        onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none focus:border-accent/80 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="athleteAge" className="block text-xs font-semibold uppercase tracking-wider text-paper-white/60 mb-1.5">
                        Athlete's Age
                      </label>
                      <input
                        type="number"
                        id="athleteAge"
                        required
                        min="5"
                        max="25"
                        value={formData.athleteAge}
                        onChange={(e) => setFormData({ ...formData, athleteAge: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none focus:border-accent/80 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Select */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-xs font-semibold uppercase tracking-wider text-paper-white/60 mb-1.5">
                      What are you reaching about?
                    </label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none focus:border-accent/80 transition-colors"
                    >
                      <option value="Baseball / Softball Programs" className="bg-ink-black text-paper-white">Baseball / Softball Programs</option>
                      <option value="Event Space Rentals" className="bg-ink-black text-paper-white">Event Space Rentals</option>
                      <option value="Sports Equipment Rentals" className="bg-ink-black text-paper-white">Sports Equipment Rentals</option>
                      <option value="General Question" className="bg-ink-black text-paper-white">General Question</option>
                      <option value="Other" className="bg-ink-black text-paper-white">Other</option>
                    </select>
                  </div>

                  {/* Parent Name */}
                  <div>
                    <label htmlFor="parentName" className="block text-xs font-semibold uppercase tracking-wider text-paper-white/60 mb-1.5">
                      Parent's Name
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none focus:border-accent/80 transition-colors"
                    />
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parentEmail" className="block text-xs font-semibold uppercase tracking-wider text-paper-white/60 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="parentEmail"
                        required
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none focus:border-accent/80 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="parentPhone" className="block text-xs font-semibold uppercase tracking-wider text-paper-white/60 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full rounded-md border border-steel-300/20 bg-steel-700/30 px-3.5 py-2 font-body text-sm text-paper-white outline-none focus:border-accent/80 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-display text-lg font-semibold text-paper-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-deep hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none active:translate-y-0"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-paper-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Send My Booking Request</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M3.75 9h10.5M10 5.25L13.75 9 10 12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success / Thank You screen */
              <div className="text-center py-6 relative z-10 flex flex-col items-center">
                {/* Animated checkmark icon */}
                <div className="h-16 w-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-accent mb-6 animate-pulse">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-paper-white">
                  You're in the lineup!
                </h3>
                <p className="mt-4 text-base leading-relaxed text-paper-white/80 max-w-sm">
                  We've received your request! A member of the NSEC team will contact you at **{formData.parentPhone}** within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-8 min-h-11 inline-flex items-center justify-center rounded-lg bg-steel-700/50 px-6 py-2 text-sm font-semibold hover:bg-steel-700 transition-colors text-paper-white"
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
