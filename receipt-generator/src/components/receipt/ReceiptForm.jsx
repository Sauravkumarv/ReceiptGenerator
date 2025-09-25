import React from 'react'
import { Store, FileText, Sparkles } from 'lucide-react'
import StoreInfoSection from './sections/StoreInfoSection'
import ReceiptInfoSection from './sections/ReceiptInfoSection'
import CustomerInfoSection from './sections/CustomerInfoSection'
import ItemsSection from './sections/ItemsSection'
import TaxDiscountSection from './sections/TaxDiscountSection'

const ReceiptForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Enhanced Design */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.001]">
          
          {/* Premium Header */}
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
            
            {/* Header Content */}
            <div className="relative p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur animate-pulse"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                      <Store className="h-8 w-8 text-blue-300" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                      Receipt Generator Pro
                    </h1>
                    <p className="text-blue-200 mt-1 font-medium">
                      Create professional receipts with ease
                    </p>
                  </div>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                  <span className="text-sm font-medium text-white">Premium</span>
                </div>
              </div>
              
              <p className="mt-4 text-slate-300 text-lg leading-relaxed max-w-2xl">
                Fill in the information below to generate a professional, customized receipt. 
                All fields are optional and can be customized to match your business needs.
              </p>
            </div>
          </div>
          
          {/* Enhanced Form Content */}
          <div className="p-8 bg-gradient-to-b from-white to-slate-50/50">
            
            {/* Progress Indicator */}
            <div className="mb-8 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-slate-600" />
                <span className="font-medium text-slate-700">Form Progress</span>
              </div>
              <div className="text-slate-500">Complete all sections for best results</div>
            </div>
            
            {/* Form Sections with Enhanced Styling */}
            <div className="space-y-8">
              
              {/* Store Information */}
              <div className="group">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-300/50">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Store Information
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">Business details and contact information</p>
                  </div>
                  <div className="p-6">
                    <StoreInfoSection />
                  </div>
                </div>
              </div>
              
              {/* Receipt Information */}
              <div className="group">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-green-300/50">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Receipt Details
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">Receipt number, dates, and payment information</p>
                  </div>
                  <div className="p-6">
                    <ReceiptInfoSection />
                  </div>
                </div>
              </div>
              
              {/* Customer Information */}
              <div className="group">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-purple-300/50">
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Customer Information
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">Billing details and customer contact information</p>
                  </div>
                  <div className="p-6">
                    <CustomerInfoSection />
                  </div>
                </div>
              </div>
              
              {/* Items */}
              <div className="group">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-orange-300/50">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      Items & Services
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">Add products or services to your receipt</p>
                  </div>
                  <div className="p-6">
                    <ItemsSection />
                  </div>
                </div>
              </div>
              
              {/* Tax & Discount */}
              <div className="group">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-red-300/50">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      Tax & Discounts
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">Configure tax rates and apply discounts</p>
                  </div>
                  <div className="p-6">
                    <TaxDiscountSection />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Enhanced Footer */}
          <div className="bg-gradient-to-r from-slate-100 to-blue-50 px-8 py-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-600">
               
              </div>
              <div className="text-xs text-slate-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Features Footer */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Built for modern businesses • Secure & Reliable
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReceiptForm