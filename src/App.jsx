import React from 'react'
import { ReceiptProvider } from '@/context/ReceiptContext'
import Layout from '@/components/layout/Layout'
import ReceiptForm from '@/components/receipt/ReceiptForm'
import ReceiptPreview from '@/components/receipt/ReceiptPreview'
import ErrorBoundary from '@/components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ReceiptProvider>
        <Layout>
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Receipt Generator
            </h1>
            <p className="text-gray-600">
              Create professional receipts in seconds
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-slide-up">
              <ReceiptForm />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <ReceiptPreview />
            </div>
            
          </div>
        </Layout>
      </ReceiptProvider>
    </ErrorBoundary>
  )
}

export default App