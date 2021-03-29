import React from 'react'

export type GlobalContextType = {
  state: State
  dispatch: React.Dispatch<Actions>
}

export interface Protocol {
  id: string
  name: string
  address: string
  symbol: string
  url: string
  description: string
  chain: string
  logo: string | null
  audits: string
  audit_note: string | null
  gecko_id: string | null
  cmcId: string
  category: string
  tvl: string
  change_1h: number
  change_1d: number
  change_7d: number
}

export type State = {
  modal: '_SIDEBAR_' | '_OFF_'
  protocols: Protocol[]
  selectedProtocol: Protocol | {}
  sorted: 'ASC' | 'DESC'
}

export type Actions = {
  type: 'MODAL' | 'SORT_TVL' | 'LOAD_DATA' | 'SELECT_PROTOCOL'
  payload?: any
}
