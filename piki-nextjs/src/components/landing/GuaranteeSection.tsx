import ScrollReveal from '@/components/shared/ScrollReveal'

const guarantees = [
  { icon: '\u{1F4CB}', title: '사전 시안 확인', desc: '개발 착수 전 디자인 시안을 먼저 보여드립니다. 마음에 드실 때 진행합니다.' },
  { icon: '\u{1F4C5}', title: '납기 준수 보장', desc: '약속한 기간 내 미완성 시 추가 수정을 무상으로 제공합니다.' },
  { icon: '\u{1F4DD}', title: '수정 범위 사전 합의', desc: '수정 횟수와 범위를 계약 전 명확히 안내드려 추가 비용 걱정이 없습니다.' },
]

export default function GuaranteeSection() {
  return (
    <section className="guarantee-section">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">GUARANTEE</span>
          <h2 className="section-title">안심하고 맡기세요</h2>
          <p className="section-desc">처음 의뢰하시는 분들도 걱정 없도록</p>
        </ScrollReveal>
        <div className="guarantee-grid">
          {guarantees.map((g, i) => (
            <ScrollReveal key={i} className="guarantee-card">
              <div className="guarantee-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
