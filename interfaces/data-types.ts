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

export interface ProtocolTvl {
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
  chains: string[]
  tvl: {
    date: number
    dailyVolumeUSD: string
    totalLiquidityUSD: string
  }[]
}

export type State = {
  modal: '_SIDEBAR_' | '_OFF_'
  protocols: Protocol[]
  displayProtocols: Protocol[]
  selectedCategory: Protocol[]
  searchResults: Protocol[]
  selectedProtocol: Protocol | {}
  sorted: 'ASC' | 'DESC'
}

export type Actions = {
  type:
    | 'MODAL'
    | 'SORT_TVL'
    | 'LOAD_DATA'
    | 'SELECT_PROTOCOL'
    | 'SELECT_TVL_CATEGORY'
    | 'SEARCH_TVL'
  payload?: any
}

export type Coin = {
  slug: string
  name: string
  geckoId: string
  llamaId?: string
  category: string // Category within DeFi
  symbol: string
  blockchain: string
  website?: string
  genesisDate?: string
  contracts: {
    ethereum?: string
    binanceSmartChain?: string
  }
  tags: string[]
  section: string // Section in the landing page and sidebar
}
