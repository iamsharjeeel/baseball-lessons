export type FormFieldErrors = Partial<
  Record<'firstName' | 'lastName' | 'email' | 'phone' | 'athleteAge' | 'reachingOutAbout' | 'form', string>
>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s().+-]{10,}$/

export function validateEvaluationForm(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  athleteAge: string
  reachingOutAbout: string
}): FormFieldErrors {
  const errors: FormFieldErrors = {}

  if (!data.firstName) errors.firstName = 'First name is required.'
  if (!data.lastName) errors.lastName = 'Last name is required.'

  if (!data.email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = 'Enter a valid email address.'
  }

  const phoneDigits = data.phone.replace(/\D/g, '')
  if (!data.phone) {
    errors.phone = 'Phone is required.'
  } else if (!PHONE_RE.test(data.phone) || phoneDigits.length < 10) {
    errors.phone = 'Enter a valid phone number.'
  }

  const age = Number(data.athleteAge)
  if (!data.athleteAge) {
    errors.athleteAge = 'Athlete age is required.'
  } else if (!Number.isFinite(age) || age < 6 || age > 25) {
    errors.athleteAge = 'Enter an age between 6 and 25.'
  }

  if (!data.reachingOutAbout) {
    errors.reachingOutAbout = 'Please select a topic.'
  }

  return errors
}
