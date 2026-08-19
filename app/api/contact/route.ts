import { NextResponse } from 'next/server'

// In-memory sliding window rate limiter
interface RateLimitEntry {
  count: number
  firstRequestTime: number
}

const ipRequestMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5 // Max 5 emails per 10 minutes per IP

// Periodic cleanup to avoid memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of ipRequestMap.entries()) {
    if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
      ipRequestMap.delete(ip)
    }
  }
}, 5 * 60 * 1000)

function getClientIp(request: Request): string {
  const headers = request.headers
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) return cfConnectingIp.trim()
  const realIp = headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return '127.0.0.1'
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request)
    const now = Date.now()

    // 1. Rate Limit Check
    const rateLimit = ipRequestMap.get(clientIp)
    if (rateLimit) {
      if (now - rateLimit.firstRequestTime < RATE_LIMIT_WINDOW_MS) {
        if (rateLimit.count >= MAX_REQUESTS_PER_WINDOW) {
          const waitMinutes = Math.ceil(
            (RATE_LIMIT_WINDOW_MS - (now - rateLimit.firstRequestTime)) / 60000
          )
          return NextResponse.json(
            {
              error: `Rate limit active: Too many messages sent. Please wait ${waitMinutes} minute(s) before trying again.`,
            },
            {
              status: 429,
              headers: {
                'Retry-After': String(Math.ceil((RATE_LIMIT_WINDOW_MS - (now - rateLimit.firstRequestTime)) / 1000)),
              },
            }
          )
        }
        rateLimit.count += 1
      } else {
        ipRequestMap.set(clientIp, { count: 1, firstRequestTime: now })
      }
    } else {
      ipRequestMap.set(clientIp, { count: 1, firstRequestTime: now })
    }

    const body = await request.json()
    const { name, email, message, botcheck, _gotcha } = body

    // 2. Honeypot check (Bots fill hidden fields)
    if (botcheck || _gotcha) {
      console.warn(`[Anti-Spam] Bot submission dropped from IP: ${clientIp}`)
      // Return 200 to fool the bot without sending anything
      return NextResponse.json({ success: true })
    }

    // 3. Validation & Length Constraints
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    const trimmedName = String(name).trim()
    const trimmedEmail = String(email).trim()
    const trimmedMessage = String(message).trim()

    if (trimmedName.length > 100 || trimmedEmail.length > 150 || trimmedMessage.length > 4000) {
      return NextResponse.json(
        { error: 'Payload exceeds allowed character limits.' },
        { status: 400 }
      )
    }

    if (trimmedMessage.length < 5) {
      return NextResponse.json(
        { error: 'Message must be at least 5 characters long.' },
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
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        subject: `New Portfolio Inquiry from ${trimmedName}`,
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
