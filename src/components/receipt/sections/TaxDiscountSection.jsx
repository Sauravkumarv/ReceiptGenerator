import React from 'react'
import { Calculator, Percent, DollarSign } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import { useReceiptCalculations } from '@/hooks/useReceiptCalculations'
import FormSection from '@/components/common/FormSection'
import Input from '@/components/common/Input'

const TaxDiscountSection = () => {
  const { state, dispatch } = useReceipt()
  const { subtotal, tax, total } = useReceiptCalculations(state)

  const handleChange = (field, value) => {
    dispatch({
      type: RECEIPT_ACTIONS.UPDATE_FIELD,
      field,
      value: parseFloat(value) || 0
    })
  }

  const applyQuickDiscount = (percentage) => {
    const discountAmount = (subtotal * percentage) / 100
    handleChange('discount', discountAmount)
  }

  return (
    <FormSection 
      title="Tax & Discounts" 
      icon={Calculator}
      description="Configure tax rates and apply discounts"
    >
      <div className="space-y-6">
        {/* Discount Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Discount Amount
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => applyQuickDiscount(5)}
                className="px-2 py-1 text-xs bg-success-100 text-success-600 rounded hover:bg-success-200 transition-colors"
              >
                5%
              </button>
              <button
                type="button"
                onClick={() => applyQuickDiscount(10)}
                className="px-2 py-1 text-xs bg-success-100 text-success-600 rounded hover:bg-success-200 transition-colors"
              >
                10%
              </button>
              <button
                type="button"
                onClick={() => applyQuickDiscount(15)}
                className="px-2 py-1 text-xs bg-success-100 text-success-600 rounded hover:bg-success-200 transition-colors"
              >
                15%
              </button>
            </div>
          </div>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={state.discount}
            onChange={(e) => handleChange('discount', e.target.value)}
            helperText={`${((state.discount / subtotal) * 100 || 0).toFixed(1)}% of subtotal`}
          />
        </div>

        {/* Tax Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Percent className="inline h-4 w-4 mr-1" />
            Tax Rate (%)
          </label>
          <Input
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="0.0"
            value={state.taxRate}
            onChange={(e) => handleChange('taxRate', e.target.value)}
            helperText={`Tax amount: ${tax.toFixed(2)}`}
          />
        </div>

        {/* Calculation Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-gray-800 mb-3">Calculation Summary</h4>
          
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          {state.discount > 0 && (
            <div className="flex justify-between text-sm text-success-600">
              <span>Discount:</span>
              <span className="font-medium">-${state.discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span>Tax ({state.taxRate}%):</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </FormSection>
  )
}

export default TaxDiscountSection