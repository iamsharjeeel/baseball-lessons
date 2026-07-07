import { NextResponse } from 'next/server'

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/ICf8ghApOiBimJDaZtfV/webhook-trigger/ea2745e9-b970-4cd7-9116-3b1db8a427c2'
const NOTIFICATION_EMAIL = 'sharjeel@voxility.ai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { athleteName, athleteAge, inquiryType, parentName, parentEmail, parentPhone } = body

    const payload = {
      athleteName,
      athleteAge,
      inquiryType,
      parentName,
      parentEmail,
      parentPhone,
      source: 'NSEC Landing Page',
      submittedAt: new Date().toISOString(),
    }

    // 1. Submit to LeadConnector webhook in JSON format
    let webhookSuccess = false
    try {
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      webhookSuccess = webhookResponse.ok
    } catch (err) {
      console.error('Webhook submission error:', err)
    }

    // 2. Submit branded notification email using Resend API (if key is configured)
    let emailSuccess = false
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>New Lead Submission</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafaf8; color: #0a0b0d; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e1e4e8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .header { background-color: #0a0b0d; color: #ffffff; padding: 32px 24px; text-align: center; border-bottom: 3px solid #388dd0; }
                .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
                .header p { margin: 4px 0 0 0; color: #388dd0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
                .content { padding: 32px 24px; }
                .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                .lead-table td { padding: 12px; border-bottom: 1px solid #e1e4e8; }
                .lead-table td.label { font-size: 11px; font-weight: 700; text-transform: uppercase; tracking: 0.1em; color: #838b94; width: 160px; }
                .lead-table td.value { font-size: 15px; font-weight: 500; color: #0a0b0d; }
                .footer { background-color: #0a0b0d; color: #838b94; text-align: center; padding: 16px; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <p>Newtown Sports &amp; Events Center</p>
                  <h1>New Lead Submission</h1>
                </div>
                <div class="content">
                  <table class="lead-table">
                    <tr>
                      <td class="label">Reaching About</td>
                      <td class="value">${inquiryType}</td>
                    </tr>
                    <tr>
                      <td class="label">Athlete Name</td>
                      <td class="value">${athleteName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td class="label">Athlete Age</td>
                      <td class="value">${athleteAge || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td class="label">Parent/Contact</td>
                      <td class="value">${parentName}</td>
                    </tr>
                    <tr>
                      <td class="label">Email Address</td>
                      <td class="value"><a href="mailto:${parentEmail}" style="color: #388dd0; text-decoration: none;">${parentEmail}</a></td>
                    </tr>
                    <tr>
                      <td class="label">Phone Number</td>
                      <td class="value"><a href="tel:${parentPhone}" style="color: #388dd0; text-decoration: none;">${parentPhone}</a></td>
                    </tr>
                    <tr>
                      <td class="label">Source</td>
                      <td class="value">NSEC Landing Page</td>
                    </tr>
                  </table>
                  <p style="font-size: 13px; color: #838b94; text-align: center; margin: 0;">
                    Please contact this lead within 24 hours to schedule their intro session.
                  </p>
                </div>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} NSEC Newtown · nacsportscenter.com
                </div>
              </div>
            </body>
          </html>
        `

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'NSEC Lead <onboarding@resend.dev>',
            to: NOTIFICATION_EMAIL,
            subject: `New Lead: ${parentName} - ${inquiryType}`,
            html: emailHtml,
          }),
        })
        emailSuccess = emailResponse.ok
      } catch (err) {
        console.error('Email notification send error:', err)
      }
    } else {
      console.warn('RESEND_API_KEY environment variable is missing. Skipping email notification.')
    }

    return NextResponse.json({
      success: true,
      webhookSubmitted: webhookSuccess,
      emailSent: emailSuccess,
    })
  } catch (err) {
    console.error('Lead route error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
