import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createSession, SESSION_COOKIE } from '@/lib/auth'

// 브루트포스 방지: IP별 실패 횟수 추적
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15분

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (!record) return true

  // 잠금 기간이 지났으면 초기화
  if (now - record.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip)
    return true
  }

  return record.count < MAX_ATTEMPTS
}

function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (!record) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
  } else {
    record.count++
    record.lastAttempt = now
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // 레이트 리밋 체크
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: '로그인 시도가 너무 많습니다. 15분 후 다시 시도해주세요.' },
      { status: 429 }
    )
  }

  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!password || !adminPassword) {
    return NextResponse.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 })
  }

  // 타이밍 공격 방지: 상수 시간 비교
  const inputBuf = Buffer.from(password.padEnd(256, '\0'))
  const expectedBuf = Buffer.from(adminPassword.padEnd(256, '\0'))
  const isMatch = crypto.timingSafeEqual(inputBuf, expectedBuf) &&
    password.length === adminPassword.length

  if (!isMatch) {
    recordFailedAttempt(ip)
    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 })
  }

  // 성공 시 실패 기록 초기화
  loginAttempts.delete(ip)

  const token = await createSession()
  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return response
}
