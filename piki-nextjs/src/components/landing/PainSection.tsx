import ScrollReveal from '@/components/shared/ScrollReveal'

const pains = [
  { icon: '\u{1F4B0}', text: <>광고 클릭은 나오는데<br /><strong>문의/예약이 안 들어와요</strong></>, tag: '전환 페이지 부재' },
  { icon: '\u{1F517}', text: <>광고 링크가<br /><strong>인스타 프로필 하나뿐이에요</strong></>, tag: '전용 랜딩 필요' },
  { icon: '\u{1F4BB}', text: <>랜딩페이지는 있는데<br /><strong>성과가 안 나와요</strong></>, tag: '전환율 최적화 필요' },
  { icon: '\u{1F4C8}', text: <>어떤 광고가 효과적인지<br /><strong>데이터를 모르겠어요</strong></>, tag: '추적 시스템 필요' },
]

export default function PainSection() {
  return (
    <section className="pain-section">
      <div className="container">
        <h2 className="section-title">혹시 이런 상황이신가요?</h2>
        <p className="section-desc" style={{ textAlign: 'center', marginBottom: 48, color: 'var(--text-muted)' }}>
          광고비는 쓰고 있는데, 돈이 새고 있는 구조일 수 있습니다
        </p>
        <div className="pain-grid">
          {pains.map((pain, i) => (
            <ScrollReveal key={i} className="pain-card">
              <div className="pain-icon">{pain.icon}</div>
              <p>{pain.text}</p>
              <span className="pain-tag">{pain.tag}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
