// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
import { State } from '../interfaces/data-types'
const AppReducer = (state: State, action: any) => {
  switch (action.type) {
    case 'MODAL':
      return { ...state, modal: action.payload }
    // case 'SEARCH':
    //   return {
    //     ...state,
    //     searchQuery: action.payload,
    //   }
    default:
      return state
  }
}
export default AppReducer
