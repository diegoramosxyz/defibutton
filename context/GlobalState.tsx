import React, { createContext, useReducer } from 'react'
import { GlobalContextType, State } from 'interfaces/data-types'
import AppReducer from './AppReducer'

const initialState: State = {
  modal: '_OFF_',
  protocols: [],
  selectedProtocol: {},
  selectedCategory: [],
  displayProtocols: [],
  searchResults: [],
  sorted: 'DESC',
}

// The global context becomes a single source of truth
// Any child element can grab states from it
export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null,
})
// The global provider gives children elements access to
// the global context
export const GlobalProvider: React.FC = ({ children }) => {
  // A reducer function enables the consumption and modification of states
  const [state, dispatch] = useReducer(AppReducer, initialState)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
