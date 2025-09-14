import { useMemo } from 'react'

export const useReceiptCalculations = (receiptData) => {
  return useMemo(() => {
    const subtotal = receiptData.items.reduce(
      (sum, item) => sum + (item.qty * item.unitPrice), 
      0
    )

    const discountAmount = receiptData.discount || 0
    const taxableAmount = Math.max(0, subtotal - discountAmount)
    const tax = taxableAmount * (receiptData.taxRate / 100)
    const total = subtotal - discountAmount + tax

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      taxableAmount: Number(taxableAmount.toFixed(2))
    }
  }, [receiptData])
}