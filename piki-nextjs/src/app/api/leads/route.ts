import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { verifySession } from '@/lib/auth'
import type { LeadStatus } from '@/lib/types'

const VALID_STATUSES: LeadStatus[] = ['new', 'contacted', 'converted', 'lost']

export async function GET(request: NextRequest) {
  const session = await verifySession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20'), 1), 100)

  // Validate status parameter
  if (status && !VALID_STATUSES.includes(status as LeadStatus)) {
    return NextResponse.json({ error: 'Invalid status filter' }, { status: 400 })
  }

  // Validate page
  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  let query = supabaseAdmin
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Leads fetch error:', error.message)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }

  // Server-side stats calculation (from all data, not paginated subset)
  const { data: allLeads } = await supabaseAdmin
    .from('leads')
    .select('status, created_at')

  const now = new Date()
  const thisMonthCount = (allLeads || []).filter((l) => {
    const d = new Date(l.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const newCount = (allLeads || []).filter((l) => l.status === 'new').length
  const convertedCount = (allLeads || []).filter((l) => l.status === 'converted').length
  const total = count || 0

  const stats = {
    total,
    thisMonth: thisMonthCount,
    newLeads: newCount,
    conversionRate: total > 0 ? Math.round((convertedCount / total) * 100) : 0,
  }

  return NextResponse.json({ leads: data, total: count, page, limit, stats })
}
