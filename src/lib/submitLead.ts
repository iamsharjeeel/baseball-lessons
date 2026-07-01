import { getStoredUtmParams } from './utm'

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/ICf8ghApOiBimJDaZtfV/webhook-trigger/ea2745e9-b970-4cd7-9116-3b1db8a427c2'

export type LeadPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  athleteAge: string
  reachingOutAbout: string
}

export async function submitLeadToWebhook(payload: LeadPayload): Promise<void> {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      source: 'nsec-baseball-lessons-lp',
      timestamp: new Date().toISOString(),
      utm: getStoredUtmParams(),
    }),
  })

  if (!response.ok) {
    throw new Error(`Webhook responded with ${response.status}`)
  }
}
