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

  const handleDownload = () => {
    downloadService.downloadReceipt(state, { subtotal, tax, total })
  }

  const handlePrint = () => {
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
      
      <div ref={receiptRef} className="p-8 bg-white font-mono text-sm receipt-preview">
        {/* Receipt Header */}
        <div className="text-center mb-8 receipt-header">
          <h1 className="text-2xl font-bold mb-3 text-gray-800">{state.storeName}</h1>
          <p className="text-gray-600 mb-1">{state.storeAddress}</p>
          <p className="text-gray-600">Phone: {state.storePhone}</p>
        </div>

        {/* Receipt Info */}
        <div className="text-center mb-8 receipt-section">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-800 pb-2">RECEIPT</h2>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <span className="font-bold">RECEIPT #:</span>
              <span className="ml-2">{state.receiptNumber}</span>
            </div>
            <div>
              <span className="font-bold">DATE:</span>
              <span className="ml-2">{state.date}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8 receipt-section">
          <h3 className="font-bold mb-3 text-lg border-b border-gray-400 pb-1">BILL TO:</h3>
          <div className="space-y-1">
            <p className="font-semibold">{state.billTo.name}</p>
            <p className="text-gray-700">{state.billTo.address}</p>
            <p className="text-gray-700">{state.billTo.email}</p>
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
          
          {state.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2 py-1 border-b border-gray-200">
              <div className="col-span-5 text-left">{item.name || 'Unnamed Item'}</div>
              <div className="col-span-2 text-center">{item.qty}</div>
              <div className="col-span-3 text-right">${item.unitPrice.toFixed(2)}</div>
              <div className="col-span-2 text-right font-semibold">${(item.qty * item.unitPrice).toFixed(2)}</div>
            </div>
          ))}
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
        >
          Download Receipt
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handlePrint}
            icon={Printer}
          >
            Print
          </Button>
          <Button
            variant="outline"
            icon={Share2}
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPreview