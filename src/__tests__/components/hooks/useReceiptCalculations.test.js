import { renderHook } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { useReceiptCalculations } from '@/hooks/useReceiptCalculations'

describe('useReceiptCalculations', () => {
  const mockReceiptData = {
    items: [
      { qty: 2, unitPrice: 10.00 },
      { qty: 1, unitPrice: 15.00 }
    ],
    discount: 5.00,
    taxRate: 10
  }

  test('calculates subtotal correctly', () => {
    const { result } = renderHook(() => useReceiptCalculations(mockReceiptData))
    
    expect(result.current.subtotal).toBe(35.00)
  })

  test('calculates tax correctly', () => {
    const { result } = renderHook(() => useReceiptCalculations(mockReceiptData))
    
    // (35 - 5) * 0.10 = 3.00
    expect(result.current.tax).toBe(3.00)
  })

  test('calculates total correctly', () => {
    const { result } = renderHook(() => useReceiptCalculations(mockReceiptData))
    
    // 35 - 5 + 3 = 33.00
    expect(result.current.total).toBe(33.00)
  })

  test('handles empty items array', () => {
    const emptyData = { ...mockReceiptData, items: [] }
    const { result } = renderHook(() => useReceiptCalculations(emptyData))
    
    expect(result.current.subtotal).toBe(0)
    expect(result.current.total).toBe(0)
  })
})