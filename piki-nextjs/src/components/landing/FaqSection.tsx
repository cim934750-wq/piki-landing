'use client'

import { useState, useEffect, useRef } from 'react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const faqs = [
  {
    q: '3일 만에 진짜 완성이 되나요?',
    a: '네, 스타터(원페이지) 기준 3영업일 내 완성됩니다. 상담 시 확인된 요구사항을 기반으로 기획→디자인→개발을 동시 진행하는 효율적 프로세스를 운영하고 있습니다. 멀티페이지(프로)는 5영업일 기준입니다.',
  },
  {
    q: '무료 수정은 어디까지 포함되나요?',
    a: '텍스트 변경, 이미지 교체, 색상 수정, 폰트 변경 등 콘텐츠 수준의 수정이 포함됩니다. 페이지 구조 변경, 새로운 페이지 추가, 기능 추가 등은 별도 견적으로 안내드립니다. 납품일로부터 7일 이내 요청 건에 적용됩니다.',
  },
  {
    q: '어떤 업종이 가장 효과가 좋은가요?',
    a: '카페·음식점·네일샵 등 지역 기반 자영업, 프랜차이즈 가맹 모집, 온라인 교육/강의, 스타트업 서비스 소개 등 광고를 통해 고객을 유입하는 모든 업종에 효과적입니다. 상담 시 업종에 맞는 최적 구성을 제안드립니다.',
  },
  {
    q: '디자인을 미리 볼 수 있나요?',
    a: '물론입니다. 개발 착수 전 디자인 시안을 먼저 공유드리고, 확인 후 개발을 시작합니다. 시안 단계에서 방향 수정이 가능하므로 안심하고 진행하실 수 있습니다.',
  },
  {
    q: '호스팅/도메인도 해주시나요?',
    a: '네, 모든 상품에 도메인 연결, SSL 인증서, 서버 호스팅이 기본 포함됩니다. 스타터는 정적 호스팅, 프로/그로스는 백엔드 서버 인프라까지 구축해드립니다. 별도 호스팅 계약 없이 바로 사용 가능합니다.',
  },
]

function FaqItem({ faq, isOpen, onToggle, index }: {
  faq: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`faq-item${isOpen ? ' open' : ''}`}
      style={{
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <button className="faq-question" onClick={onToggle}>
        <span>{faq.q}</span>
        <span className="faq-arrow">&#9660;</span>
      </button>
      <div className="faq-answer">
        <p>{faq.a}</p>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">자주 묻는 질문</h2>
          <p className="section-desc">상담 전 궁금한 점을 먼저 확인하세요</p>
        </ScrollReveal>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
