'use client'

import ScrollReveal from '@/components/shared/ScrollReveal'

const metrics = [
  {
    industry: '카페 / 음식점',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    rows: [
      { label: '평균 CPC', value: '500~1,200원' },
      { label: '전환율 (Before)', value: '1~2%', bad: true },
      { label: '전환율 (After)', value: '3~6%', good: true },
      { label: '리드당 비용 절감', value: '예상 40~60%', good: true, highlight: true },
    ],
  },
  {
    industry: '뷰티 / 네일샵',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    rows: [
      { label: '평균 CPC', value: '300~800원' },
      { label: '전환율 (Before)', value: '2~3%', bad: true },
      { label: '전환율 (After)', value: '5~8%', good: true },
      { label: '예약당 비용 절감', value: '예상 40~60%', good: true, highlight: true },
    ],
  },
  {
    industry: '스타트업 / SaaS',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    rows: [
      { label: '평균 CPC', value: '1,000~3,000원' },
      { label: '전환율 (Before)', value: '1~2%', bad: true },
      { label: '전환율 (After)', value: '3~5%', good: true },
      { label: 'CAC 절감', value: '예상 35~50%', good: true, highlight: true },
    ],
  },
  {
    industry: '교육 / 학원',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    rows: [
      { label: '평균 CPC', value: '800~2,000원' },
      { label: '전환율 (Before)', value: '1~3%', bad: true },
      { label: '전환율 (After)', value: '4~7%', good: true },
      { label: '수강 신청당 비용 절감', value: '예상 40~55%', good: true, highlight: true },
    ],
  },
]

export default function MetricsSection() {
  return (
    <section className="metrics-section" id="metrics">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">WHY IT WORKS</span>
          <h2 className="section-title">전환 시스템이 만드는 차이</h2>
          <p className="section-desc">업종별 광고 효율 개선 시나리오 (업계 평균 데이터 기반)</p>
        </ScrollReveal>
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <ScrollReveal key={i} className="metric-card" delay={i * 100}>
              <div className="metric-header" style={{ background: m.gradient }}>
                <span className="metric-industry">{m.industry}</span>
              </div>
              <div className="metric-body">
                {m.rows.map((r, ri) => (
                  <div key={ri} className={`metric-row${r.highlight ? ' highlight' : ''}`}>
                    <span className="metric-label">{r.label}</span>
                    <span className={`metric-value${r.bad ? ' bad-value' : ''}${r.good ? ' good-value' : ''}`}>
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="metrics-source">
          * 업계 평균 데이터 기반 예상 시나리오이며, PIKI의 실 운영 사례가 아닙니다. 실제 성과는 업종, 광고 예산, 시장 상황에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  )
}
