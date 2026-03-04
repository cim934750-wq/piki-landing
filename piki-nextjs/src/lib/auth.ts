import { NextRequest } from 'next/server'

const SESSION_COOKIE = 'piki_admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000

async function createToken(payload: object): Promise<string> {
  const secret = process.env.SESSION_SECRET!
  const data = JSON.stringify({ ...payload, exp: Date.now() + SESSION_DURATION })
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const sig = Buffer.from(signature).toString('base64url')
  const payload64 = Buffer.from(data).toString('base64url')
  return `${payload64}.${sig}`
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const [payload64, sig] = token.split('.')
    if (!payload64 || !sig) return false
    const secret = process.env.SESSION_SECRET!
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const data = Buffer.from(payload64, 'base64url').toString()
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      Buffer.from(sig, 'base64url'),
      encoder.encode(data)
    )
    if (!valid) return false
    const parsed = JSON.parse(data)
    return parsed.exp > Date.now()
  } catch {
    return false
  }
}

export async function createSession(): Promise<string> {
  return createToken({ role: 'admin' })
}

export async function verifySession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) return false
  return verifyToken(token)
}

export { SESSION_COOKIE }
