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
          label="Store/Business Name"
          type="text"
          placeholder="e.g., ABC Retail Store"
          value={state.storeName}
          onChange={(e) => handleChange('storeName', e.target.value)}
          helperText="Your business or store name"
        />
        
        <Input
          label="Store Address"
          type="text"
          placeholder="e.g., 123 Main Street, City, State"
          value={state.storeAddress}
          onChange={(e) => handleChange('storeAddress', e.target.value)}
          helperText="Complete business address"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="e.g., +1-234-567-8901"
            value={state.storePhone}
            onChange={(e) => handleChange('storePhone', e.target.value)}
            helperText="Business phone number"
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g., info@store.com"
            value={state.storeEmail}
            onChange={(e) => handleChange('storeEmail', e.target.value)}
            helperText="Business email (optional)"
          />
        </div>
        
        <Input
          label="Website"
          type="url"
          placeholder="e.g., https://www.store.com"
          value={state.storeWebsite}
          onChange={(e) => handleChange('storeWebsite', e.target.value)}
          helperText="Business website (optional)"
        />
      </div>
    </FormSection>
  )
}

export default StoreInfoSection