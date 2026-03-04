'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const [badgeText, setBadgeText] = useState('')
  const fullText = '광고 효율 개선 전문 파트너'

  // Typing effect
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setBadgeText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      if (visualRef.current) {
        visualRef.current.style.transform = `translateY(${window.scrollY * 0.1}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Magnetic button
  function handleBtnMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15 - 2}px)`
  }

  function handleBtnMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.transform = ''
  }

  function scrollTo(e: React.MouseEvent, href: string) {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero">
      <div className="hero-bg-grid"></div>
      <div className="hero-particles">
        <div className="hero-particle" style={{ left: '10%', top: '20%', '--tx': '80px', '--ty': '-180px' } as React.CSSProperties} />
        <div className="hero-particle" style={{ left: '70%', top: '60%', '--tx': '-60px', '--ty': '-220px' } as React.CSSProperties} />
        <div className="hero-particle" style={{ left: '30%', top: '80%', '--tx': '120px', '--ty': '-300px' } as React.CSSProperties} />
        <div className="hero-particle" style={{ left: '85%', top: '30%', '--tx': '-100px', '--ty': '-150px' } as React.CSSProperties} />
        <div className="hero-particle" style={{ left: '50%', top: '50%', '--tx': '50px', '--ty': '-250px' } as React.CSSProperties} />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge" ref={badgeRef}>{badgeText}</div>
          <h1>
            광고비 낭비를 줄이는<br />
            <span className="gradient-text">전환 시스템을 설치해드립니다</span>
          </h1>
          <p className="hero-desc">
            광고는 돌리는데 전환 페이지가 없거나, 있어도 성과가 안 나오시나요?<br />
            <strong>광고 → 랜딩 → 데이터 → 재전환</strong>까지, 매출로 이어지는 시스템을 구축합니다.
          </p>
          <div className="hero-actions">
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => scrollTo(e, '#contact')}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              무료 광고 효율 진단받기
            </a>
            <a href="#system" className="btn btn-ghost" onClick={(e) => scrollTo(e, '#system')}>
              시스템 구조 보기
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">7일</span>
              <span className="stat-label">최단 구축 기간</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">ROAS</span>
              <span className="stat-label">광고 수익률 개선</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">&frac12; CAC</span>
              <span className="stat-label">고객 획득 비용 절감</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" ref={visualRef}>
          <div className="mockup-browser">
            <div className="mockup-topbar">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-url">yoursite.co.kr</div>
            </div>
            <div className="mockup-content">
              <div className="mockup-hero-block"></div>
              <div className="mockup-text-block"></div>
              <div className="mockup-text-block short"></div>
              <div className="mockup-cards">
                <div className="mockup-card"></div>
                <div className="mockup-card"></div>
                <div className="mockup-card"></div>
              </div>
              <div className="mockup-cta-block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
