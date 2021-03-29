// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
// TODO: Revise types
const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'MODAL':
      return { ...state, modal: action.payload }
    // case 'SEARCH':
    //   return {
    //     ...state,
    //     searchQuery: action.payload,
    //   }
    case "SORT_TVL":
      if (state.sorted === "ASC") {
        return {
          ...state,
          sorted: "DESC",
          protocols: state.protocols.sort(
            // @ts-ignore
            ({ tvl: tvla }, { tvl: tvlb }) => +tvlb - +tvla
          ),
        }
      } else {
        return {
          ...state,
          sorted: "ASC",
          protocols: state.protocols.sort(
            // @ts-ignore
            ({ tvl: tvla }, { tvl: tvlb }) => +tvla - +tvlb
          ),
        }
      }
    case "LOAD_DATA":
      return {
        ...state,
        protocols: action.payload.sort(
          // @ts-ignore
          ({ tvl: tvla }, { tvl: tvlb }) => +tvlb - +tvla
        ),
      }
    case "SELECT_PROTOCOL":
      return {
        ...state,
        selectedProtocol: state.protocols.filter(
          ({ symbol }: { symbol: string }) => symbol === action.payload
        )[0],
      }
    default:
      return state
  }
}
export default AppReducer
