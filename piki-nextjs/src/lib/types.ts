export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost'

export interface Lead {
  id: string
  name: string
  phone: string
  situation: string
  budget: string | null
  message: string | null
  status: LeadStatus
  created_at: string
  updated_at: string
}

export interface ContactFormData {
  name: string
  phone: string
  situation: string
  budget?: string
  message?: string
}

export interface LeadStats {
  total: number
  thisMonth: number
  newLeads: number
  conversionRate: number
}
