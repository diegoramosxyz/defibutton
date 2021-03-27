import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { FaBars } from 'react-icons/fa'
import GlobalModal from './GlobalModal'

export default function UserDropdown() {
  const { dispatch } = useContext(GlobalContext)
  return (
    <>
      <GlobalModal component="_SIDEBAR_" />
      <button aria-label="Menu" onClick={() => dispatch({ type: 'MODAL', payload: '_SIDEBAR_' })} >
        <FaBars className="h-6 w-6" />
      </button>
    </>
  )
}
