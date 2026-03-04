import ScrollReveal from '@/components/shared/ScrollReveal'

const steps = [
  { title: '무료 광고 효율 진단', desc: '현재 광고 구조와 전환 동선을 분석하고, 개선 포인트를 제안합니다.' },
  { title: '전환 설계 & 시안', desc: '데이터 기반으로 전환율 높은 페이지를 설계하고, 시안을 먼저 공유합니다.' },
  { title: '시스템 구축 & 서버 세팅', desc: '랜딩페이지 개발, 백엔드 서버 구축, GA4/픽셀/UTM 추적 시스템을 설치합니다.' },
  { title: '런칭 & 데이터 모니터링', desc: '시스템을 가동하고, ROAS/CAC/전환율 데이터를 실시간 확인할 수 있도록 세팅합니다.' },
]

export default function ProcessSection() {
  return (
    <section className="process" id="process">
      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-tag">PROCESS</span>
          <h2 className="section-title">이렇게 설치됩니다</h2>
          <p className="section-desc">진단부터 시스템 가동까지, 최단 7일이면 완료</p>
        </ScrollReveal>
        <div className="process-timeline">
          {steps.map((step, i) => (
            <ScrollReveal key={i} className="process-step">
              <div className="step-marker">{i + 1}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
