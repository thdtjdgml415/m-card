import { User } from './user'

export interface Term {
  id: string
  link?: string
  title: string
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
}

export interface ApplyValues {
  userId: User['uid']
  terms: Array<Term['id']>
  applyedAt: Date
  cardId: string
  salary: string
  crediScore: string
  payDate: string
  isMaster: boolean
  isHipass: boolean
  isRf: boolean
  status: keyof typeof APPLY_STATUS
  step: number
}

export interface Option {
  label: string
  value: string | number | undefined
}
