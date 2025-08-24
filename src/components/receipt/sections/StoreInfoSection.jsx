import React from 'react'
import { Store } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import FormSection from '@/components/common/FormSection'
import Input from '@/components/common/Input'

const StoreInfoSection = () => {
  const { state, dispatch } = useReceipt()

  const handleChange = (field, value) => {
    dispatch({
      type: RECEIPT_ACTIONS.UPDATE_FIELD,
      field,
      value
    })
  }

  return (
    <FormSection 
      title="Store Information" 
      icon={Store}
      description="Enter your business details"
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Customer Name"
          type="text"
          placeholder="e.g., John Doe or ABC Company"
          value={state.billTo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          helperText="Full name or business name"
        />
        
        <Input
          label="Customer Address"
          type="text"
          placeholder="e.g., 789 Market Avenue, City, State"
          value={state.billTo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          helperText="Complete mailing address"
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g., customer@example.com"
          value={state.billTo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          helperText="Email for receipt delivery (optional)"
        />
      </div>
    </FormSection>
  )
}

export default CustomerInfoSection