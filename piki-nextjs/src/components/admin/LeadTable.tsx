'use client'

import type { Lead, LeadStatus } from '@/lib/types'

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: '신규',
  contacted: '연락완료',
  converted: '전환',
  lost: '이탈',
}

interface Props {
  leads: Lead[]
  onStatusChange: (id: string, status: LeadStatus) => void
}

export default function LeadTable({ leads, onStatusChange }: Props) {
  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <p>아직 접수된 리드가 없습니다.</p>
      </div>
    )
  }

  return (
    <table className="lead-table">
      <thead>
        <tr>
          <th>이름</th>
          <th>연락처</th>
          <th>상황</th>
          <th>예산</th>
          <th>메시지</th>
          <th>상태</th>
          <th>접수일</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.phone}</td>
            <td>{lead.situation}</td>
            <td>{lead.budget || '-'}</td>
            <td>{lead.message ? (lead.message.length > 30 ? lead.message.slice(0, 30) + '...' : lead.message) : '-'}</td>
            <td>
              <select
                className="status-select"
                value={lead.status}
                onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
              >
                {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </td>
            <td>{new Date(lead.created_at).toLocaleDateString('ko-KR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
