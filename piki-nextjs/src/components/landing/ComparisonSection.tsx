import ScrollReveal from '@/components/shared/ScrollReveal'

export default function ComparisonSection() {
  return (
    <section className="comparison-section">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">WHY PIKI</span>
          <h2 className="section-title">다른 솔루션과 비교해보세요</h2>
          <p className="section-desc">노코드, 프리랜서, 에이전시 — PIKI는 어떻게 다른가</p>
        </ScrollReveal>
        <div className="comparison-grid">
          <div className="comparison-card comparison-others">
            <div className="comparison-badge">노코드 (아임웹 등)</div>
            <h3>템플릿 기반 웹사이트</h3>
            <ul>
              <li>월 1~5만원 구독</li>
              <li>디자인 커스텀 한계</li>
              <li>백엔드/결제 시스템 구축 불가</li>
              <li>플랫폼 종속 (코드 소유 불가)</li>
            </ul>
          </div>
          <div className="comparison-card comparison-others">
            <div className="comparison-badge">프리랜서 (크몽 등)</div>
            <h3>외주 개발</h3>
            <ul>
              <li>30~200만원 (역량 편차 큼)</li>
              <li>전환 전략 없이 시안만 제작</li>
              <li>데이터 추적 미포함</li>
              <li>유지보수 보장 어려움</li>
            </ul>
          </div>
          <div className="comparison-card comparison-piki">
            <div className="comparison-badge">PIKI</div>
            <h3>전환 시스템 풀스택 구축</h3>
            <ul>
              <li>일회성 구축비 — 코드 제공</li>
              <li>랜딩+백엔드+데이터 원스톱</li>
              <li>전환 전략 + 추적 시스템 포함</li>
              <li>월관리로 지속적 성과 개선</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
