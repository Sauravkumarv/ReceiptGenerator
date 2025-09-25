import React, { useRef, useState } from 'react'
import { Receipt, Download, Printer, Share2, Save } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { useReceiptCalculations } from '@/hooks/useReceiptCalculations'
import { downloadService } from '@/services/downloadService'
import { shareService } from '@/services/shareService'
import Button from '@/components/common/Button'
import axios from "axios";


const ReceiptPreview = () => {
  const { state } = useReceipt()
  const { subtotal, tax, total } = useReceiptCalculations(state)
  const receiptRef = useRef()
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)
  const [isReceiptUsed, setIsReceiptUsed] = useState(false);
  const [checkingReceipt, setCheckingReceipt] = useState(false);

  const handleSaveToggle = () => {
    setIsSaveEnabled(!isSaveEnabled)
  }

  // Check if bill is ready for download/print
  const isBillReady = () => {
    return (
      state.receiptNumber && state.receiptNumber.trim() !== '' &&
      state.storeName && 
      state.storeName.trim() !== '' &&
      state.billTo.name && 
      state.billTo.name.trim() !== '' &&
      state.items.length > 0 &&
      state.items.some(item => item.name && item.name.trim() !== '')
    )
  }

  const API_URL = import.meta.env.VITE_API_URL;

// ✅ Check with backend if receipt number exists
const checkReceiptExists = async (receiptNumber) => {
  if (!receiptNumber) return true; // treat empty as used
  try {
    setCheckingReceipt(true);
    const response = await axios.post(`${API_URL}/check-receipt`, { receiptNumber });
    setCheckingReceipt(false);
    setIsReceiptUsed(response.data.exists);
    return response.data.exists;
  } catch (err) {
    console.error("Receipt check failed:", err);
    setCheckingReceipt(false);
    setIsReceiptUsed(true); // prevent download
    alert("Unable to verify receipt number. Please try again later.");
    return true; // treat as already used to block download
  }
};






  const handleDownload = async () => {

    if (!isBillReady()) {
      alert('Please fill store name, customer name,receipt number and add at least one item.');
      return;
    }
    const exists = await checkReceiptExists(state.receiptNumber);
    if (exists) {
      alert('Receipt number already used. Generate a new one.');
      return;
    }

    try {
      // 1️⃣ Generate PDF blob
      const pdfBlob = await downloadService.generateReceiptBlob(state, { subtotal, tax, total });

    

      // 2️⃣ Download in browser
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${state.receiptNumber || 'unnamed'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);


      // 3️⃣ Upload to backend if enabled
      if (isSaveEnabled) {
        const formData = new FormData();
        formData.append("receiptPdf", pdfBlob, `receipt-${state.receiptNumber || 'unnamed'}.pdf`)
        formData.append("receiptNumber", state.receiptNumber || '');
  formData.append("storeName", state.storeName || '');
  formData.append("billTo[name]", state.billTo?.name || '');
  formData.append("subtotal", subtotal);
  formData.append("tax", tax);
  formData.append("total", total);

        const response = await axios.post(`${API_URL}/upload`, formData, {
           withCredentials: true,
        });

        if (response.data.success) {
          console.log("Saved to backend:", response.data.filename);
        } else {
          console.warn("Backend save failed:", response.data.message);
        }
      }

      alert('Receipt downloaded successfully!');
      setIsReceiptUsed(true);
      
    } catch (error) {
      console.error('Download/Save failed:', error);
      alert('Something went wrong while processing receipt.');
    }
  };

  const handlePrint = async () => {
    if (!isBillReady() ) {
              // || isReceiptUsed  it is for block the print and share button after generated

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
    if (!isBillReady() ) {  
        // || isReceiptUsed  it is for block the print and share button after generated
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

      {/* Autosave */}
      <div className="p-6 bg-gray-50 border-t space-y-3">
        <div className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
          <Save className={`h-4 w-4 ${isSaveEnabled ? 'text-emerald-600' : 'text-gray-400'}`} />
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSaveEnabled}
              onChange={handleSaveToggle}
              className="sr-only"
              disabled={!isBillReady()}
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isSaveEnabled ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isSaveEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Auto-save PDF after download
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        {/* Download Button - Professional Gradient */}
        <Button
  variant="gradient"
  size="full"
  onClick={handleDownload}
  icon={Download}
  disabled={!isBillReady()}
  className={`from-blue-600 to-purple-600 
    ${isBillReady() 
      ? "hover:from-blue-700 hover:to-purple-700" 
      : "opacity-50 cursor-not-allowed pointer-events-none"}`}
>
  {isBillReady() ? "Download PDF Receipt" : "Fill form to enable download"}
</Button>

<div className="grid grid-cols-2 gap-3">
  <Button
    variant="outline"
    onClick={handlePrint}
    icon={Printer}
    disabled={!isBillReady()}
    className={`bg-gray-700 text-white border-none
      ${isBillReady() ? "hover:bg-gray-800" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
  >
    Print
  </Button>

  <Button
    variant="outline"
    onClick={handleShare}
    icon={Share2}
    disabled={!isBillReady()}
    className={`bg-indigo-600 text-white border-none
      ${isBillReady() ? "hover:bg-indigo-700" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
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

export default ReceiptPreview;