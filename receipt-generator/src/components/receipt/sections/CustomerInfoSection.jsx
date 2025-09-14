import React from 'react'
import { User } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import FormSection from '@/components/common/FormSection'
import Input from '@/components/common/Input'

const CustomerInfoSection = () => {
  const { state, dispatch } = useReceipt()

  const handleChange = (field, value) => {
    dispatch({
      type: RECEIPT_ACTIONS.UPDATE_NESTED_FIELD,
      parent: 'billTo',
      field,
      value
    })
  }

  return (
    <FormSection
      title="Customer Information"
      icon={User}
      description="Details of the person or business receiving this receipt"
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Customer Name"
          value={state.billTo?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter customer name"
        />
        
        <Input
          label="Email Address"
          type="email"
          value={state.billTo?.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="customer@example.com"
        />
        
        <Input
          label="Phone Number"
          type="tel"
          value={state.billTo?.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company/Organization"
            value={state.billTo?.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="Company name (optional)"
          />
          
          <Input
            label="Tax ID/VAT Number"
            value={state.billTo?.taxId || ''}
            onChange={(e) => handleChange('taxId', e.target.value)}
            placeholder="Tax ID (optional)"
          />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Billing Address</h4>
          
          <Input
            label="Street Address"
            value={state.billTo?.address?.street || ''}
            onChange={(e) => handleChange('address', { ...state.billTo?.address, street: e.target.value })}
            placeholder="123 Main Street"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={state.billTo?.address?.city || ''}
              onChange={(e) => handleChange('address', { ...state.billTo?.address, city: e.target.value })}
              placeholder="City"
            />
            
            <Input
              label="State/Province"
              value={state.billTo?.address?.state || ''}
              onChange={(e) => handleChange('address', { ...state.billTo?.address, state: e.target.value })}
              placeholder="State"
            />
            
            <Input
              label="ZIP/Postal Code"
              value={state.billTo?.address?.zip || ''}
              onChange={(e) => handleChange('address', { ...state.billTo?.address, zip: e.target.value })}
              placeholder="12345"
            />
          </div>
          
          <Input
            label="Country"
            value={state.billTo?.address?.country || ''}
            onChange={(e) => handleChange('address', { ...state.billTo?.address, country: e.target.value })}
            placeholder="United States"
          />
        </div>
      </div>
    </FormSection>
  )
}

export default CustomerInfoSection