import React from 'react'

export type GlobalContextType = {
  state: State
  dispatch: React.Dispatch<Actions>
}

export type State = {
  modal: '_SIDEBAR_' | '_OFF_'
}

export type Actions = {
  type: 'MODAL'
  payload: any
}
