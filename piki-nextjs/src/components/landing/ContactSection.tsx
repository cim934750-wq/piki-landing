'use client'

import { useState, FormEvent } from 'react'

const SITUATION_OPTIONS = [
  '광고 돌리는데 전환이 안 나옴',
  '광고 링크가 인스타 프로필뿐',
  '랜딩페이지 있는데 성과 부진',
  '처음 광고 시작하려는 단계',
  '기타',
]

const BUDGET_OPTIONS = ['30만원 미만', '30~100만원', '100~300만원', '300만원 이상']

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    situation: '',
    budget: '',
    message: '',
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (isSubmitting || isSubmitted) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.status === 429) {
        alert('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.')
        return
      }
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || '전송에 실패했습니다.')
        return
      }

      setIsSubmitted(true)
      alert('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.')
      setFormData({ name: '', phone: '', situation: '', budget: '', message: '' })

      // GA4 event (no PII - only event name)
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
          event_category: 'contact',
        })
      }
    } catch {
      alert('전송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-content">
          <h2>무료 광고 효율 진단받기</h2>
          <p>
            현재 광고 구조를 분석하고, 전환 시스템으로 얼마나 개선할 수 있는지
            <br />
            무료로 진단해드립니다. 5분이면 충분합니다.
          </p>
          <form className="cta-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="이름 / 상호명"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="연락처"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-row">
              <select
                required
                value={formData.situation}
                onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              >
                <option value="" disabled>현재 상황을 선택해주세요</option>
                {SITUATION_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="" disabled>월 광고 예산 (선택)</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="추가로 알려주실 내용 (업종, 현재 고민 등)"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting || isSubmitted}>
              {isSubmitting ? '전송 중...' : isSubmitted ? '신청 완료!' : '무료 진단 신청하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
