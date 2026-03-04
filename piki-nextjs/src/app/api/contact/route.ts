import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { ContactFormData } from '@/lib/types'

const VALID_SITUATIONS = [
  '광고 돌리는데 전환이 안 나옴',
  '광고 링크가 인스타 프로필뿐',
  '랜딩페이지 있는데 성과 부진',
  '처음 광고 시작하려는 단계',
  '기타',
]

// Rate limiting: max 3 submissions per IP per 10 minutes
const submissions = new Map<string, { count: number; firstSubmit: number }>()
const MAX_SUBMISSIONS = 3
const WINDOW_MS = 10 * 60 * 1000

function checkSubmitLimit(ip: string): boolean {
  const now = Date.now()
  const record = submissions.get(ip)
  if (!record) return true
  if (now - record.firstSubmit > WINDOW_MS) {
    submissions.delete(ip)
    return true
  }
  return record.count < MAX_SUBMISSIONS
}

function recordSubmission(ip: string) {
  const now = Date.now()
  const record = submissions.get(ip)
  if (!record) {
    submissions.set(ip, { count: 1, firstSubmit: now })
  } else {
    record.count++
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkSubmitLimit(ip)) {
      return NextResponse.json(
        { error: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      )
    }

    const body: ContactFormData = await request.json()

    // Required fields
    if (!body.name || !body.phone || !body.situation) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
    }

    // Length limits
    if (body.name.length > 50) {
      return NextResponse.json({ error: '이름은 50자 이내로 입력해주세요.' }, { status: 400 })
    }
    if (body.phone.length > 20) {
      return NextResponse.json({ error: '올바른 연락처를 입력해주세요.' }, { status: 400 })
    }
    if (body.message && body.message.length > 1000) {
      return NextResponse.json({ error: '메시지는 1000자 이내로 입력해주세요.' }, { status: 400 })
    }

    // Validate situation is from allowed list
    if (!VALID_SITUATIONS.includes(body.situation)) {
      return NextResponse.json({ error: '올바른 상황을 선택해주세요.' }, { status: 400 })
    }

    // Phone format validation (Korean phone numbers)
    const cleanPhone = body.phone.replace(/[-\s]/g, '')
    if (!/^01[016789]\d{7,8}$/.test(cleanPhone)) {
      return NextResponse.json({ error: '올바른 연락처를 입력해주세요.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert({
        name: body.name.trim().slice(0, 50),
        phone: body.phone.trim(),
        situation: body.situation,
        budget: body.budget || null,
        message: body.message?.trim().slice(0, 1000) || null,
      })
      .select()
      .single()

    if (error) throw error

    recordSubmission(ip)
    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
