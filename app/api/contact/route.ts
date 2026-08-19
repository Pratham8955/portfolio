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

    const accessKey = (
      process.env.WEB3FORMS_ACCESS_KEY?.trim() || '9f62dc2a-e329-4a84-8073-b3167e1aa26e'
    )
    
    const formData = new FormData()
    formData.append('access_key', String(accessKey))
    formData.append('name', String(name).trim())
    formData.append('email', String(email).trim())
    formData.append('message', String(message).trim())
    formData.append('subject', `New Portfolio Inquiry from ${name}`)
    formData.append('from_name', 'Pratham Sali Portfolio')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: formData,
    })

    const rawText = await response.text()

    let data: any
    try {
      data = JSON.parse(rawText)
    } catch {
      console.warn('Web3Forms returned raw payload:', rawText)
      if (response.ok) {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json(
        { error: 'Email service returned an unexpected response format.' },
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
