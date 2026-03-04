import ScrollReveal from '@/components/shared/ScrollReveal'

const targets = [
  {
    emoji: '\u{1F4B0}',
    title: <>광고는 돌리는데<br />전환이 안 나오는 업장</>,
    desc: '메타/구글 광고비는 매달 나가는데, 클릭 후 이탈률이 높아 실제 문의로 이어지지 않는 상태',
    needs: ['전환율 최적화', 'ROAS 개선'],
  },
  {
    emoji: '\u{1F517}',
    title: <>광고 링크가<br />인스타 프로필 하나인 곳</>,
    desc: '광고 클릭 시 인스타그램 프로필이나 네이버 블로그로 보내고 있어, 전환 동선이 없는 상태',
    needs: ['전용 랜딩', 'CTA 설계'],
  },
  {
    emoji: '\u{1F4BB}',
    title: <>랜딩페이지는 있는데<br />성과가 안 나오는 업장</>,
    desc: '아임웹/식스샵으로 만든 페이지가 있지만, 전환 설계가 안 되어 광고비만 소진 중',
    needs: ['리뉴얼', '데이터 추적'],
  },
  {
    emoji: '\u{1F4AC}',
    title: <>DM으로만 문의 받고 있어<br />관리가 안 되는 곳</>,
    desc: '인스타 DM, 카톡으로만 상담하다 보니 리드 관리가 안 되고, 놓치는 고객이 많은 상태',
    needs: ['폼 시스템', '리드 관리'],
  },
]

export default function TargetSection() {
  return (
    <section className="target-section" id="target">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">WHO NEEDS THIS</span>
          <h2 className="section-title">이런 분들이 찾고 계십니다</h2>
          <p className="section-desc">광고를 돌리고 있지만 전환 구조가 빠져 있는 사업장</p>
        </ScrollReveal>
        <div className="target-grid">
          {targets.map((t, i) => (
            <ScrollReveal key={i} className="target-card">
              <div className="target-emoji">{t.emoji}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="target-needs">
                {t.needs.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
