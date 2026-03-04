import ScrollReveal from '@/components/shared/ScrollReveal'

const steps = [
  {
    icon: '\u{1F4E2}',
    label: '광고 유입',
    desc: <>메타·구글·네이버 광고에서<br />타겟 고객을 유입</>,
    metrics: ['CPC \u2193', '클릭률 \u2191'],
  },
  {
    icon: '\u{1F3AF}',
    label: '전환 랜딩',
    desc: <>전환 설계된 랜딩페이지에서<br />문의/예약/가입 유도</>,
    metrics: ['전환율 \u2191', '이탈률 \u2193'],
  },
  {
    icon: '\u{1F4CA}',
    label: '데이터 추적',
    desc: <>GA4·UTM·픽셀로<br />어떤 광고가 효과적인지 파악</>,
    metrics: ['ROAS 측정', 'CAC 분석'],
  },
  {
    icon: '\u{1F504}',
    label: '재전환/리타겟',
    desc: <>데이터 기반으로 광고 최적화<br />이탈 고객 리타겟팅</>,
    metrics: ['리드당 비용 \u2193', 'ROAS \u2191'],
  },
]

export default function SystemSection() {
  return (
    <section className="system-section" id="system">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">CONVERSION SYSTEM</span>
          <h2 className="section-title">이렇게 매출이 만들어집니다</h2>
          <p className="section-desc">광고비를 매출로 전환하는 4단계 시스템</p>
        </ScrollReveal>
        <div className="system-flow">
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <ScrollReveal className="system-step">
                <div className="system-icon">{step.icon}</div>
                <div className="system-label">{step.label}</div>
                <p>{step.desc}</p>
                <div className="system-metric">
                  {step.metrics.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </ScrollReveal>
              {i < steps.length - 1 && <div className="system-arrow">&rarr;</div>}
            </div>
          ))}
        </div>
        <div className="system-comparison">
          <div className="system-before">
            <h4>Before (현재)</h4>
            <p>광고 &rarr; 인스타 프로필 &rarr; 이탈</p>
            <div className="comparison-result bad">광고비 낭비, ROAS 측정 불가</div>
          </div>
          <div className="system-after">
            <h4>After (시스템 설치 후)</h4>
            <p>광고 &rarr; 전환 랜딩 &rarr; 데이터 &rarr; 재전환</p>
            <div className="comparison-result good">광고비 절감, ROAS 지속 개선</div>
          </div>
        </div>
      </div>
    </section>
  )
}
