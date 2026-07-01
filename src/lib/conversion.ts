import { getStoredUtmParams } from './utm'
import { trackLead } from './metaPixel'

export type EvaluationFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  athleteAge: string
  reachingOutAbout: string
}

/** Fires Meta Pixel Lead + dispatches a DOM event for GHL CAPI listeners. */
export function trackFormConversion(data: EvaluationFormData): string {
  const eventId =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `lead-${Date.now()}`

  trackLead(eventId)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('nsec:conversion', {
        detail: {
          ...data,
          eventId,
          eventName: 'Lead',
          utm: getStoredUtmParams(),
        },
      }),
    )
  }

  return eventId
}
