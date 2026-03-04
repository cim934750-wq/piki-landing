'use client'

import { useCallback } from 'react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const services = [
  {
    number: '01',
    title: '웹사이트 & 전환 랜딩',
    desc: '기업 사이트부터 광고 전환 랜딩까지, 전환율 중심 설계로 문의/예약을 만들어냅니다.',
    features: [
      '전환율 중심 UX/CTA 설계',
      '반응형 웹사이트 + 모바일 최적화',
      'SEO 최적화 (메타태그/사이트맵/구조화 데이터)',
      'UTM + GA4 + 메타/구글 픽셀 세팅',
    ],
    featured: true,
  },
  {
    number: '02',
    title: '백엔드 & 시스템 개발',
    desc: '서버, 데이터베이스, API, 결제/예약 시스템까지 — 비즈니스에 필요한 기술 인프라를 구축합니다.',
    features: [
      <><strong>서버 + API</strong> — Node.js / Python 기반 구축</>,
      <><strong>데이터베이스</strong> — MySQL / MongoDB 설계·구축</>,
      <><strong>결제·예약</strong> — 토스페이먼츠 / 카카오페이 연동</>,
      '관리자 대시보드 개발',
    ],
    featured: false,
  },
  {
    number: '03',
    title: '데이터 추적 & 자동화',
    desc: '광고 데이터 추적, SNS 자동 운영, 리타겟팅까지 — 지속적인 성장 시스템을 설치합니다.',
    features: [
      'GA4 + GTM + 픽셀 풀 세팅',
      'ROAS/CAC 대시보드 구축',
      'SNS 자동화 + 예약 발행',
      '리타겟팅 캠페인 설계',
    ],
    featured: false,
  },
]

export default function ServicesSection() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = ''
  }, [])

  return (
    <section className="services" id="services">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">WHAT WE BUILD</span>
          <h2 className="section-title">구축해드리는 것들</h2>
          <p className="section-desc">기획부터 개발, 배포, 운영까지 — 개발자가 직접 풀스택으로 세팅합니다</p>
        </ScrollReveal>
        <div className="services-grid">
          {services.map((s, i) => (
            <ScrollReveal key={i} className={`service-card${s.featured ? ' featured' : ''}`} delay={i * 150}>
              <div
                className="service-card-inner"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="service-number">{s.number}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-features">
                  {s.features.map((f, fi) => (
                    <li key={fi}>{f}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
