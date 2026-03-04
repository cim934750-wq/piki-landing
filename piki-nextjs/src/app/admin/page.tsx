'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LeadTable from '@/components/admin/LeadTable'
import StatsCards from '@/components/admin/StatsCards'
import type { Lead, LeadStatus, LeadStats } from '@/lib/types'

const FILTER_LABELS: Record<string, string> = {
  all: '전체',
  new: '신규',
  contacted: '연락완료',
  converted: '전환',
  lost: '이탈',
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    setLoading(true)
    try {
      const res = await fetch('/api/leads')
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        const data = await res.json()
        setLeads(data.leads || [])
        // Use server-side calculated stats
        if (data.stats) {
          setStats(data.stats)
        }
      }
    } catch {
      console.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(id: string, status: LeadStatus) {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchLeads()
  }

  function handleLogout() {
    document.cookie = 'piki_admin_session=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const filteredLeads = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  return (
    <>
      <header className="admin-header">
        <h1>PIKI<span>.</span> Admin</h1>
        <button className="admin-logout" onClick={handleLogout}>
          로그아웃
        </button>
      </header>
      <div className="admin-body">
        {stats && <StatsCards stats={stats} />}
        <div className="table-header">
          <h2>리드 관리</h2>
          <div className="filter-tabs">
            {Object.entries(FILTER_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`filter-tab${filter === key ? ' active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="empty-state"><p>로딩 중...</p></div>
        ) : (
          <LeadTable leads={filteredLeads} onStatusChange={handleStatusChange} />
        )}
      </div>
    </>
  )
}
