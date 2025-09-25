import React from 'react'
import { FileText, Calendar, Hash } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import FormSection from '@/components/common/FormSection'
import Input from '@/components/common/Input'

const ReceiptInfoSection = () => {
  const { state, dispatch } = useReceipt()

  const handleChange = (field, value) => {
    dispatch({
      type: RECEIPT_ACTIONS.UPDATE_FIELD,
      field,
      value
    })
  }

  // Generate current date in YYYY-MM-DD format for date input
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  // Generate a random receipt number if one doesn't exist
  const generateReceiptNumber = () => {
    const prefix = 'RCP-';
  
    // Last 5 digits of timestamp (milliseconds)
    const timestampPart = Date.now().toString().slice(-5); 
  
    // 3–5 digit random number to make it 8–10 digits total
    const randomPart = Math.floor(Math.random() * 100000).toString().padStart(3, '0');
  
    return `${prefix}${timestampPart}${randomPart}`; // e.g., RCP-123456789
  };
  

  return (
    <FormSection
      title="Receipt Information"
      icon={FileText}
      description="Basic details and identification for this receipt"
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="Receipt Number"
              value={state.receiptNumber || ''}
              onChange={(e) => handleChange('receiptNumber', e.target.value)}
              placeholder="RCP-123456-001"
              icon={Hash}
             
            />
            {!state.receiptNumber && (
              <button
                type="button"
                onClick={() => handleChange('receiptNumber', generateReceiptNumber())}
                className="absolute right-2 top-8 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
              >
                Generate
              </button>
            )}
          </div>
          
          <Input
            label="Receipt Date"
            type="date"
            value={state.receiptDate || getCurrentDate()}
            onChange={(e) => handleChange('receiptDate', e.target.value)}
            icon={Calendar}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Due Date (Optional)"
            type="date"
            value={state.dueDate || ''}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            placeholder="Payment due date"
          />
          
          <Input
            label="Reference Number"
            value={state.referenceNumber || ''}
            onChange={(e) => handleChange('referenceNumber', e.target.value)}
            placeholder="Order #, Invoice #, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={state.paymentStatus || 'paid'}
              onChange={(e) => handleChange('paymentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partial">Partially Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={state.paymentMethod || 'cash'}
              onChange={(e) => handleChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="digital_wallet">Digital Wallet</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={state.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Additional notes or comments about this receipt"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Receipt Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Receipt #:</span>
              <span className="font-mono">{state.receiptNumber || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{state.receiptDate || getCurrentDate()}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                state.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                state.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                state.paymentStatus === 'partial' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {state.paymentStatus || 'Paid'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  )
}

export default ReceiptInfoSection