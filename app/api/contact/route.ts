import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
      '9f62dc2a-e329-4a84-8073-b3167e1aa26e'

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: String(accessKey),
        name: String(name).trim(),
        email: String(email).trim(),
        message: String(message).trim(),
        subject: `New Portfolio Inquiry from ${name}`,
        from_name: 'Pratham Sali Portfolio',
      }),
    })

    const rawText = await response.text()

    let data: any
    try {
      data = JSON.parse(rawText)
    } catch {
      if (response.ok) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json(
        {
          error:
            'Unable to deliver message through automated email relay. Please reach out directly to Prathamsali107@gmail.com.',
        },
        { status: 502 }
      )
    }

    if (data.success || response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: data.message || 'Failed to dispatch message via email gateway.' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Contact API handler error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error while transmitting message.' },
      { status: 500 }
    )
  }
}
