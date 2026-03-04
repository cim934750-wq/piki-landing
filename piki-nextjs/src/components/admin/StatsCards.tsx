import type { LeadStats } from '@/lib/types'

interface Props {
  stats: LeadStats
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-label">전체 리드</div>
        <div className="stat-card-value">{stats.total}<small>건</small></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">이번 달</div>
        <div className="stat-card-value">{stats.thisMonth}<small>건</small></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">신규 (미처리)</div>
        <div className="stat-card-value">{stats.newLeads}<small>건</small></div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">전환율</div>
        <div className="stat-card-value">{stats.conversionRate}<small>%</small></div>
      </div>
    </div>
  )
}
