import React, { useState, useCallback } from 'react'
import { 
  User, Mail, Phone, Building2, CreditCard, MapPin, 
  Globe, Check, AlertCircle
} from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import FormSection from '@/components/common/FormSection'

// Simple, clean input component
const SimpleInput = React.memo(({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  icon: Icon,
  validation,
  ...props 
}) => {
  const [focused, setFocused] = useState(false)
  const isValid = validation ? validation(value) : null

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            focused ? 'text-blue-500' : 'text-gray-400'
          }`} />
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 
            border border-gray-300 rounded-lg text-base
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
            ${isValid === false ? 'border-red-300' : ''}
            ${isValid === true ? 'border-green-300' : ''}
            placeholder-gray-400 overflow-visible`}
          {...props}
        />
        
        {isValid !== null && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid === true && <Check className="h-5 w-5 text-green-500" />}
            {isValid === false && <AlertCircle className="h-5 w-5 text-red-500" />}
          </div>
        )}
      </div>
    </div>
  )
})

// Simple validations
const validateEmail = (email) => {
  if (!email) return null
  return /\S+@\S+\.\S+/.test(email)
}

const validatePhone = (phone) => {
  if (!phone) return null
  return phone.length >= 10
}

const CustomerInfoSection = () => {
  const { state, dispatch } = useReceipt()

  const handleChange = useCallback((field, value) => {
    dispatch({
      type: RECEIPT_ACTIONS.UPDATE_NESTED_FIELD,
      parent: 'billTo',
      field,
      value
    })
  }, [dispatch])

  const handleAddressChange = useCallback((field, value) => {
    const currentAddress = state.billTo?.address || {}
    handleChange('address', { ...currentAddress, [field]: value })
  }, [state.billTo?.address, handleChange])

  return (
    <FormSection
      title="Customer Information"
      icon={User}
      description="Enter customer details"
    >
      <div className="space-y-6">
        {/* Name */}
        <SimpleInput
          label="Customer Name"
          value={state.billTo?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Smith"
          icon={User}
        />
        
        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SimpleInput
            label="Email"
            type="email"
            value={state.billTo?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            icon={Mail}
            validation={validateEmail}
          />
          
          <SimpleInput
            label="Phone"
            type="tel"
            value={state.billTo?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="9876543210"
            icon={Phone}
            validation={validatePhone}
          />
        </div>
        
        {/* Company & Tax ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SimpleInput
            label="Company"
            value={state.billTo?.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="ABC Corporation"
            icon={Building2}
          />
          
          <SimpleInput
            label="Tax ID"
            value={state.billTo?.taxId || ''}
            onChange={(e) => handleChange('taxId', e.target.value)}
            placeholder="GST123456789"
            icon={CreditCard}
          />
        </div>
        
        {/* Address */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Address
          </h3>
          
          <SimpleInput
            label="Street Address"
            value={state.billTo?.address?.street || ''}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            placeholder="123 Main Street"
            icon={Building2}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SimpleInput
              label="City"
              value={state.billTo?.address?.city || ''}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="Mumbai"
            />
            
            <SimpleInput
              label="State"
              value={state.billTo?.address?.state || ''}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              placeholder="Maharashtra"
            />
            
            <SimpleInput
              label="PIN Code"
              value={state.billTo?.address?.zip || ''}
              onChange={(e) => handleAddressChange('zip', e.target.value)}
              placeholder="400001"
            />
          </div>
          
          <SimpleInput
            label="Country"
            value={state.billTo?.address?.country || ''}
            onChange={(e) => handleAddressChange('country', e.target.value)}
            placeholder="India"
            icon={Globe}
          />
        </div>
      </div>
    </FormSection>
  )
}

export default CustomerInfoSection