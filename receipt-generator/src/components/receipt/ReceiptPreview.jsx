import React, { useRef } from 'react'
import { Receipt, Download, Printer, Share2 } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { useReceiptCalculations } from '@/hooks/useReceiptCalculations'
import { downloadService } from '@/services/downloadService'
import { shareService } from '@/services/shareService'
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

  const handlePrint = async () => {
    if (!isBillReady()) {
      alert('Please fill in store name, customer name, and add at least one item before printing.')
      return
    }
    
    try {
      await downloadService.printReceipt(state, { subtotal, tax, total })
    } catch (error) {
      console.error('Print failed:', error)
      alert('Print failed. Please try again.')
    }
  }

  const handleShare = async () => {
    if (!isBillReady()) {
      alert('Please fill in store name, customer name, and add at least one item before sharing.')
      return
    }
    
    try {
      const result = await shareService.shareReceipt(state, { subtotal, tax, total })
      
      if (result.success) {
        if (result.method === 'clipboard') {
          alert('Receipt copied to clipboard!')
        } else if (result.method === 'email') {
          alert('Email client opened with receipt details!')
        }
      } else if (result.cancelled) {
        // User cancelled, no action needed
      }
    } catch (error) {
      console.error('Share failed:', error)
      alert('Share failed. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 mt-4 overflow-hidden">
      {/* Simple Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Receipt className="mr-3 h-6 w-6" />
          Receipt Preview
        </h2>
        <p className="mt-2 opacity-90">Live preview of your receipt</p>
      </div>
      
      {/* Simple Receipt Container */}
      <div className="p-6">
        <div className="max-w-md mx-auto bg-white border-2 border-gray-300 rounded-lg shadow-lg">
          <div ref={receiptRef} className="p-8 font-mono text-sm receipt-preview" id="receipt-content">
            
            {/* Store Header */}
            <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
              <h1 className="text-xl font-bold mb-2">
                {state.storeName || 'Your Store Name'}
              </h1>
              <p className="text-gray-700">{state.storeAddress || 'Store Address'}</p>
              <p className="text-gray-700">Phone: {state.storePhone || 'Phone Number'}</p>
              {state.storeEmail && <p className="text-gray-700">Email: {state.storeEmail}</p>}
              {state.storeWebsite && <p className="text-gray-700">Website: {state.storeWebsite}</p>}
            </div>

            {/* Receipt Info */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold border-b border-gray-400 pb-1">RECEIPT</h2>
              </div>
              <div className="space-y-1 text-sm">
                <div>Receipt #: {state.receiptNumber || 'Not set'}</div>
                <div>Date: {state.receiptDate}</div>
                {state.dueDate && <div>Due Date: {state.dueDate}</div>}
                {state.referenceNumber && <div>Reference #: {state.referenceNumber}</div>}
                {state.paymentStatus && <div>Payment Status: {state.paymentStatus.toUpperCase()}</div>}
                {state.paymentMethod && <div>Payment Method: {state.paymentMethod.toUpperCase()}</div>}
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-6">
              <h3 className="font-bold mb-2 border-b border-gray-400 pb-1">BILL TO:</h3>
              <div className="text-sm space-y-1">
                <div className="font-semibold">{state.billTo.name || 'Customer Name'}</div>
                {state.billTo.company && <div>{state.billTo.company}</div>}
                <div>
                  {state.billTo.address.street && `${state.billTo.address.street}, `}
                  {state.billTo.address.city && `${state.billTo.address.city}, `}
                  {state.billTo.address.state && `${state.billTo.address.state} `}
                  {state.billTo.address.zip && `${state.billTo.address.zip}`}
                  {state.billTo.address.country && `, ${state.billTo.address.country}`}
                </div>
                {state.billTo.email && <div>Email: {state.billTo.email}</div>}
                {state.billTo.phone && <div>Phone: {state.billTo.phone}</div>}
                {state.billTo.taxId && <div>Tax ID: {state.billTo.taxId}</div>}
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <div className="border-b-2 border-gray-800 pb-2 mb-3">
                <div className="grid grid-cols-4 gap-2 font-bold text-xs">
                  <div>ITEM</div>
                  <div className="text-center">QTY</div>
                  <div className="text-right">PRICE</div>
                  <div className="text-right">TOTAL</div>
                </div>
              </div>
              
              {state.items.length > 0 ? (
                <div className="space-y-2">
                  {state.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 text-xs py-1 border-b border-gray-200">
                      <div className="truncate">{item.name || 'Item'}</div>
                      <div className="text-center">{item.qty || 0}</div>
                      <div className="text-right">${(item.unitPrice || 0).toFixed(2)}</div>
                      <div className="text-right">${((item.qty || 0) * (item.unitPrice || 0)).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-xs">
                  No items added
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="border-t-2 border-gray-800 pt-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {state.discount > 0 && (
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-${state.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax ({state.taxRate}%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-400 pt-2 mt-2">
                  <span>TOTAL:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {state.notes && state.notes.trim() && (
              <div className="mt-6 pt-4 border-t border-gray-400">
                <div className="font-bold mb-2">Notes:</div>
                <div className="text-xs whitespace-pre-wrap">{state.notes}</div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center mt-6 pt-4 border-t border-gray-400">
              <div className="text-sm font-bold">Thank you!</div>
              <div className="text-xs text-gray-600 mt-2">Generated by ReceiptGen</div>
            </div>
          </div>
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
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            icon={Share2}
            disabled={!isBillReady()}
            className={!isBillReady() ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Share
          </Button>
        </div>
        
        {!isBillReady() && (
          <div className="text-center text-sm text-gray-500 mt-3">
            <p>Complete the form to enable download and print options</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceiptPreview