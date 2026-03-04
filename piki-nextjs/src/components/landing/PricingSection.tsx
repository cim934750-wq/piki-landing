'use client'

import ScrollReveal from '@/components/shared/ScrollReveal'

const plans = [
  {
    name: '스타터',
    price: '49',
    priceSuffix: '만원~',
    desc: '랜딩페이지 + 기본 시스템',
    target: '광고 시작하는 소상공인',
    features: [
      '원페이지 반응형 랜딩/웹사이트',
      '기본 폼 + GA4 세팅',
      '메타/구글 픽셀 설치',
      '서버 + 호스팅 + SSL',
      'SEO 기본 설정',
      <strong key="build">최단 7일 내 구축</strong>,
      <strong key="mod">1회 무료 수정 포함</strong>,
    ],
    addon: '+ 월 관리 9.9만원/월 (선택)',
    popular: false,
  },
  {
    name: '프로',
    price: '99',
    priceSuffix: '만원~',
    desc: '풀스택 개발 패키지',
    target: '시스템이 필요한 업장',
    features: [
      '멀티페이지 웹사이트/랜딩',
      '백엔드 서버 + API + DB 구축',
      '결제/예약 시스템 연동',
      'UTM + GA4 + 픽셀 풀 세팅',
      'ROAS/CAC 대시보드',
      <strong key="build">견적 협의 후 일정 확정</strong>,
      <strong key="mod">3회 무료 수정 포함</strong>,
    ],
    addon: '+ 월 관리 19.9만원/월 (선택)',
    popular: true,
  },
  {
    name: '그로스',
    price: '맞춤',
    priceSuffix: '견적',
    desc: '풀스택 + 성장 시스템',
    target: '성장에 투자하는 업장',
    features: [
      '프로 전체 포함',
      '관리자 대시보드 개발',
      'SNS 자동화 + 리타겟팅',
      '월간 성과 리포트',
      '전용 서버 인프라 구축',
      '전담 매니저 배정',
      <strong key="mod">수정 무제한</strong>,
    ],
    addon: '월 관리 포함',
    popular: false,
  },
]

export default function PricingSection() {
  function scrollTo(e: React.MouseEvent, href: string) {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">PRICING</span>
          <h2 className="section-title">투명한 가격 구조</h2>
          <p className="section-desc">일회 구축비 + 선택형 월 관리로 운영됩니다</p>
        </ScrollReveal>

        <div className="pricing-model-info">
          <div className="model-tab">
            <div className="model-item">
              <h4>일회 구축비</h4>
              <p>웹사이트/랜딩 + 백엔드 시스템 + 서버 구축</p>
            </div>
            <span className="model-plus">+</span>
            <div className="model-item">
              <h4>월 관리비 (선택)</h4>
              <p>SNS 자동화, 성과 리포트, 수정 대응, 리타겟팅</p>
            </div>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} className={`pricing-card${plan.popular ? ' popular' : ''}`}>
              {plan.popular && <div className="pricing-badge">BEST</div>}
              <div className="pricing-name">{plan.name}</div>
              <div className="pricing-price">
                {plan.price}<span>{plan.priceSuffix}</span>
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <div className="pricing-target">{plan.target}</div>
              <ul className="pricing-features">
                {plan.features.map((f, fi) => (
                  <li key={fi}>{f}</li>
                ))}
              </ul>
              <div className="pricing-addon">{plan.addon}</div>
              <a
                href="#contact"
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                onClick={(e) => scrollTo(e, '#contact')}
              >
                무료 진단 신청
              </a>
            </ScrollReveal>
          ))}
        </div>
        <div className="pricing-note">
          <p>* 일회 구축비 : 웹사이트/랜딩 + 서버 인프라 + 시스템 개발 (1회 납부)</p>
          <p>* 월 관리비 : SNS 자동화, 수정 대응, 성과 리포트 (선택, 3개월 단위 계약)</p>
          <p>* 무료 수정 : 납품일로부터 7일 이내, 콘텐츠 수준 변경에 한함</p>
          <p>* 모든 상품에 도메인 + SSL + 호스팅 + 백엔드 서버 기본 포함</p>
        </div>
      </div>
    </section>
  )
}
