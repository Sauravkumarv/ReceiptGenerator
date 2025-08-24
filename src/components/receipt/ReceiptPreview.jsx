import React, { useRef } from 'react'
import { Receipt, Download, Printer, Share2 } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { useReceiptCalculations } from '@/hooks/useReceiptCalculations'
import { downloadService } from '@/services/downloadService'
import Button from '@/components/common/Button'

const ReceiptPreview = () => {
  const { state } = useReceipt()
  const { subtotal, tax, total } = useReceiptCalculations(state)
  const receiptRef = useRef()

  // Check if bill is ready for download/print
  const isBillReady = () => {
    return (
      state.storeName && 
      state.storeName.trim() !== '' &&
      state.billTo.name && 
      state.billTo.name.trim() !== '' &&
      state.items.length > 0 &&
      state.items.some(item => item.name && item.name.trim() !== '')
    )
  }

  const handleDownload = async () => {
    if (!isBillReady()) {
      alert('Please fill in store name, customer name, and add at least one item before downloading.')
      return
    }
    
    try {
      await downloadService.downloadReceipt(state, { subtotal, tax, total })
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const handlePrint = () => {
    if (!isBillReady()) {
      alert('Please fill in store name, customer name, and add at least one item before printing.')
      return
    }
    downloadService.printReceipt()
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-up">
      <div className="bg-gradient-to-r from-success-600 to-teal-600 text-white p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Receipt className="mr-3 h-6 w-6" />
          Receipt Preview
        </h2>
        <p className="mt-2 opacity-90">Live preview of your receipt</p>
      </div>
      
      <div ref={receiptRef} className="p-8 bg-white font-mono text-sm receipt-preview" id="receipt-content">
        {/* Receipt Header */}
        <div className="text-center mb-8 receipt-header">
          <h1 className="text-2xl font-bold mb-3 text-gray-800">
            {state.storeName || 'Your Store Name'}
          </h1>
          <p className="text-gray-600 mb-1">
            {state.storeAddress || 'Store Address'}
          </p>
          <p className="text-gray-600">
            Phone: {state.storePhone || 'Phone Number'}
          </p>
          {state.storeEmail && (
            <p className="text-gray-600">Email: {state.storeEmail}</p>
          )}
          {state.storeWebsite && (
            <p className="text-gray-600">Website: {state.storeWebsite}</p>
          )}
        </div>

        {/* Receipt Info */}
        <div className="text-center mb-8 receipt-section">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-800 pb-2">RECEIPT</h2>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <span className="font-bold">RECEIPT #:</span>
              <span className="ml-2">{state.receiptNumber || 'Not set'}</span>
            </div>
            <div>
              <span className="font-bold">DATE:</span>
              <span className="ml-2">{state.receiptDate}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8 receipt-section">
          <h3 className="font-bold mb-3 text-lg border-b border-gray-400 pb-1">BILL TO:</h3>
          <div className="space-y-1">
            <p className="font-semibold">{state.billTo.name || 'Customer Name'}</p>
            <p className="text-gray-700">
              {state.billTo.address.street && `${state.billTo.address.street}, `}
              {state.billTo.address.city && `${state.billTo.address.city}, `}
              {state.billTo.address.state && `${state.billTo.address.state} `}
              {state.billTo.address.zip && `${state.billTo.address.zip}`}
              {state.billTo.address.country && `, ${state.billTo.address.country}`}
            </p>
            <p className="text-gray-700">{state.billTo.email || 'customer@example.com'}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 receipt-section">
          <div className="border-b-2 border-gray-800 pb-2 mb-4">
            <div className="grid grid-cols-12 gap-2 font-bold text-xs uppercase">
              <div className="col-span-5">Item Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-3 text-right">Unit Price</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
          </div>
          
          {state.items.length > 0 ? (
            state.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-2 py-1 border-b border-gray-200">
                <div className="col-span-5 text-left">{item.name || 'Unnamed Item'}</div>
                <div className="col-span-2 text-center">{item.qty || 0}</div>
                <div className="col-span-3 text-right">${(item.unitPrice || 0).toFixed(2)}</div>
                <div className="col-span-2 text-right font-semibold">${((item.qty || 0) * (item.unitPrice || 0)).toFixed(2)}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 border-b border-gray-200">
              <p>No items added yet</p>
              <p className="text-sm">Add items in the form to see them here</p>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="receipt-total">
          <div className="space-y-2 text-right">
            <div className="flex justify-between py-1">
              <span className="font-semibold">SUBTOTAL:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {state.discount > 0 && (
              <div className="flex justify-between py-1 text-success-600">
                <span className="font-semibold">DISCOUNT:</span>
                <span>-${state.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="font-semibold">SALES TAX ({state.taxRate}%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-gray-800 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>GRAND TOTAL:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8 py-6 bg-gray-50 rounded-lg">
          <p className="font-bold text-lg mb-2">Thank you for your purchase!</p>
          <p className="text-gray-600">We appreciate your business</p>
          <p className="text-sm text-gray-500 mt-2">Generated by ReceiptGen</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-gray-50 border-t space-y-3">
        <Button
          variant="gradient"
          size="full"
          onClick={handleDownload}
          icon={Download}
          disabled={!isBillReady()}
          className={!isBillReady() ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isBillReady() ? 'Download PDF Receipt' : 'Fill form to enable download'}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handlePrint}
            icon={Printer}
            disabled={!isBillReady()}
            className={!isBillReady() ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isBillReady() ? 'Print' : 'Fill form to enable print'}
          </Button>
          <Button
            variant="outline"
            icon={Share2}
            disabled={!isBillReady()}
            className={!isBillReady() ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isBillReady() ? 'Share' : 'Fill form to enable share'}
          </Button>
        </div>
        
        {!isBillReady() && (
          <div className="text-center text-sm text-gray-500 mt-2">
            <p>Complete the form to enable download and print options</p>
            <p className="text-xs">Required: Store name, customer name, and at least one item</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceiptPreview