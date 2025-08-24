import React from 'react'
import { Store } from 'lucide-react'
import StoreInfoSection from './sections/StoreInfoSection'
import ReceiptInfoSection from './sections/ReceiptInfoSection'
import CustomerInfoSection from './sections/CustomerInfoSection'
import ItemsSection from './sections/ItemsSection'
import TaxDiscountSection from './sections/TaxDiscountSection'

const ReceiptForm = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up">
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Store className="mr-3 h-6 w-6" />
          Receipt Details
        </h2>
        <p className="mt-2 opacity-90">Fill in the information below to generate your receipt</p>
      </div>
      
      <div className="p-6 space-y-6">
        <StoreInfoSection />
        <ReceiptInfoSection />
        <CustomerInfoSection />
        <ItemsSection />
        <TaxDiscountSection />
      </div>
    </div>
  )
}

export default ReceiptForm