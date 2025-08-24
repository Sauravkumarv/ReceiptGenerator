import React, { createContext, useContext, useReducer } from 'react'
import { receiptReducer } from './receiptReducer'
import { INITIAL_STATE } from '@/utils/constants'

const ReceiptContext = createContext()

export const useReceipt = () => {
  const context = useContext(ReceiptContext)
  if (!context) {
    throw new Error('useReceipt must be used within a ReceiptProvider')
  }
  return context
}

export const ReceiptProvider = ({ children }) => {
  const [state, dispatch] = useReducer(receiptReducer, INITIAL_STATE)

  const value = {
    state,
    dispatch,
  }

  return (
    <ReceiptContext.Provider value={value}>
      {children}
    </ReceiptContext.Provider>
  )
}