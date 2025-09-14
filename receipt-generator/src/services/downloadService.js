import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// 🔹 Helper: find the download button
const findDownloadButton = () => {
  let downloadBtn = document.querySelector('button[data-download]')
  if (!downloadBtn) {
    downloadBtn = document.querySelector('button[aria-label*="download" i]')
  }
  if (!downloadBtn) {
    const buttons = Array.from(document.querySelectorAll('button'))
    downloadBtn = buttons.find(
      (btn) =>
        btn.textContent && btn.textContent.toLowerCase().includes('download')
    )
  }
  return downloadBtn
}

// 🔹 Helper: update button state
const updateButtonState = (button, text, disabled) => {
  if (!button) return null
  const originalState = { text: button.textContent, disabled: button.disabled }
  button.textContent = text
  button.disabled = disabled
  return originalState
}

// 🔹 Helper: clean filenames
const sanitizeFilename = (filename) =>
  filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '-').trim()

// 🔹 Create PDF directly from data (NO html2canvas)
const createPDFFromData = (receiptData, calculations) => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = 210
  const pageHeight = 297
  let yPos = 20
  
  // Helper function to add text with word wrapping
  const addText = (text, x, y, options = {}) => {
    const maxWidth = options.maxWidth || (pageWidth - 40)
    const fontSize = options.fontSize || 10
    const align = options.align || 'left'
    const isBold = options.bold || false
    
    pdf.setFontSize(fontSize)
    
    if (isBold) {
      pdf.setFont('helvetica', 'bold')
    } else {
      pdf.setFont('helvetica', 'normal')
    }
    
    if (text.length * fontSize * 0.6 > maxWidth) {
      // Word wrap if text is too long
      const lines = pdf.splitTextToSize(text, maxWidth)
      lines.forEach((line, index) => {
        pdf.text(line, x, y + (index * (fontSize * 0.4)), { align })
      })
      return y + (lines.length * (fontSize * 0.4))
    } else {
      pdf.text(text, x, y, { align })
      return y + (fontSize * 0.4)
    }
  }
  
  // Helper to add a line
  const addLine = (x1, y1, x2, y2) => {
    pdf.line(x1, y1, x2, y2)
  }
  
  // HEADER SECTION
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 5
  
  // Store name
  yPos = addText(
    (receiptData.storeName || 'STORE NAME').toUpperCase(),
    pageWidth / 2,
    yPos + 10,
    { fontSize: 18, bold: true, align: 'center' }
  ) + 5
  
  // Store details
  if (receiptData.storeAddress) {
    yPos = addText(receiptData.storeAddress, pageWidth / 2, yPos, { 
      fontSize: 10, align: 'center' 
    }) + 3
  }
  
  if (receiptData.storePhone) {
    yPos = addText(`Phone: ${receiptData.storePhone}`, pageWidth / 2, yPos, {
      fontSize: 10, align: 'center'
    }) + 3
  }
  
  if (receiptData.storeEmail) {
    yPos = addText(`Email: ${receiptData.storeEmail}`, pageWidth / 2, yPos, {
      fontSize: 10, align: 'center'
    }) + 3
  }
  
  if (receiptData.storeWebsite) {
    yPos = addText(`Website: ${receiptData.storeWebsite}`, pageWidth / 2, yPos, {
      fontSize: 10, align: 'center'
    }) + 3
  }
  
  yPos += 5
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 10
  
  // RECEIPT INFO
  yPos = addText('RECEIPT', pageWidth / 2, yPos, {
    fontSize: 16, bold: true, align: 'center'
  }) + 10
  
  yPos = addText(`Receipt #: ${receiptData.receiptNumber || 'Not set'}`, 20, yPos) + 5
  yPos = addText(`Date: ${receiptData.receiptDate || new Date().toISOString().split('T')[0]}`, 20, yPos) + 3
  
  if (receiptData.dueDate) {
    yPos = addText(`Due Date: ${receiptData.dueDate}`, 20, yPos) + 3
  }
  
  if (receiptData.referenceNumber) {
    yPos = addText(`Reference #: ${receiptData.referenceNumber}`, 20, yPos) + 3
  }
  
  if (receiptData.paymentStatus) {
    yPos = addText(`Payment Status: ${receiptData.paymentStatus.toUpperCase()}`, 20, yPos) + 3
  }
  
  if (receiptData.paymentMethod) {
    yPos = addText(`Payment Method: ${receiptData.paymentMethod.toUpperCase()}`, 20, yPos) + 3
  }
  
  yPos += 7
  
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 10
  
  // BILL TO SECTION
  yPos = addText('BILL TO:', 20, yPos, { fontSize: 12, bold: true }) + 5
  
  if (receiptData.billTo?.name) {
    yPos = addText(receiptData.billTo.name, 20, yPos) + 3
  }
  
  if (receiptData.billTo?.company) {
    yPos = addText(`Company: ${receiptData.billTo.company}`, 20, yPos) + 3
  }
  
  if (receiptData.billTo?.address) {
    const addr = receiptData.billTo.address
    if (addr.street) {
      yPos = addText(addr.street, 20, yPos) + 3
    }
    
    const cityStateZip = [addr.city, addr.state, addr.zip].filter(Boolean).join(', ')
    if (cityStateZip) {
      yPos = addText(cityStateZip, 20, yPos) + 3
    }
    
    if (addr.country) {
      yPos = addText(addr.country, 20, yPos) + 3
    }
  }
  
  if (receiptData.billTo?.email) {
    yPos = addText(`Email: ${receiptData.billTo.email}`, 20, yPos) + 3
  }
  
  if (receiptData.billTo?.phone) {
    yPos = addText(`Phone: ${receiptData.billTo.phone}`, 20, yPos) + 3
  }
  
  if (receiptData.billTo?.taxId) {
    yPos = addText(`Tax ID: ${receiptData.billTo.taxId}`, 20, yPos) + 3
  }
  
  yPos += 10
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 10
  
  // ITEMS SECTION
  yPos = addText('ITEMS:', 20, yPos, { fontSize: 12, bold: true }) + 8
  
  // Table headers
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(10)
  pdf.text('Item', 20, yPos)
  pdf.text('Qty', 120, yPos)
  pdf.text('Price', 140, yPos)
  pdf.text('Total', 170, yPos)
  yPos += 5
  
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 8
  
  // Items
  pdf.setFont('helvetica', 'normal')
  if (receiptData.items && receiptData.items.length > 0) {
    receiptData.items.forEach((item) => {
      const name = item.name || 'Unnamed Item'
      const qty = (item.qty || 0).toString()
      const price = `$${(item.unitPrice || 0).toFixed(2)}`
      const total = `$${((item.qty || 0) * (item.unitPrice || 0)).toFixed(2)}`
      
      // Handle long item names
      const maxNameWidth = 95
      if (pdf.getTextWidth(name) > maxNameWidth) {
        const lines = pdf.splitTextToSize(name, maxNameWidth)
        lines.forEach((line, index) => {
          pdf.text(line, 20, yPos + (index * 4))
        })
        yPos += (lines.length * 4)
      } else {
        pdf.text(name, 20, yPos)
        yPos += 6
      }
      
      // Align other columns with the last line of item name
      const itemYPos = yPos - 6
      pdf.text(qty, 120, itemYPos)
      pdf.text(price, 140, itemYPos)
      pdf.text(total, 170, itemYPos)
      
      yPos += 2
    })
  } else {
    yPos = addText('No items added', 20, yPos) + 5
  }
  
  yPos += 10
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 10
  
  // TOTALS SECTION
  const { subtotal, tax, total } = calculations || { subtotal: 0, tax: 0, total: 0 }
  
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)
  
  pdf.text('SUBTOTAL:', 130, yPos)
  pdf.text(`$${subtotal.toFixed(2)}`, 170, yPos)
  yPos += 8
  
  if (receiptData.discount && receiptData.discount > 0) {
    pdf.text('DISCOUNT:', 130, yPos)
    pdf.text(`-$${receiptData.discount.toFixed(2)}`, 170, yPos)
    yPos += 8
  }
  
  pdf.text(`TAX (${receiptData.taxRate || 0}%):`, 130, yPos)
  pdf.text(`$${tax.toFixed(2)}`, 170, yPos)
  yPos += 10
  
  addLine(130, yPos, pageWidth - 20, yPos)
  yPos += 8
  
  // Grand total
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(14)
  pdf.text('GRAND TOTAL:', 130, yPos)
  pdf.text(`$${total.toFixed(2)}`, 170, yPos)
  yPos += 15
  
  addLine(20, yPos, pageWidth - 20, yPos)
  yPos += 15
  
  // NOTES SECTION
  if (receiptData.notes && receiptData.notes.trim()) {
    yPos = addText('NOTES:', 20, yPos, { fontSize: 12, bold: true }) + 5
    yPos = addText(receiptData.notes, 20, yPos, { maxWidth: pageWidth - 40 }) + 10
    addLine(20, yPos, pageWidth - 20, yPos)
    yPos += 10
  }
  
  // Footer
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(12)
  yPos = addText('Thank you for your purchase!', pageWidth / 2, yPos, {
    align: 'center', fontSize: 12
  }) + 5
  
  yPos = addText('Visit us again soon!', pageWidth / 2, yPos, {
    align: 'center', fontSize: 12
  }) + 15
  
  // Generated by footer
  pdf.setFontSize(8)
  pdf.setTextColor(128, 128, 128)
  pdf.text(`Generated by ReceiptGen - ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 10, {
    align: 'center'
  })
  
  return pdf
}

// 🔹 Try html2canvas first, fallback to direct PDF
const downloadReceipt = async (receiptData, calculations) => {
  let downloadBtn = null
  let originalButtonState = null
  
  try {
    downloadBtn = findDownloadButton()
    originalButtonState = updateButtonState(downloadBtn, 'Generating PDF...', true)
    
    console.log('Starting PDF generation...')
    console.log('Receipt data:', receiptData)
    console.log('Calculations:', calculations)
    
    // FIRST: Try to find receipt element for html2canvas
    let receiptElement = document.querySelector('.receipt-preview') ||
                        document.querySelector('#receipt-content') ||
                        document.querySelector('[data-receipt]')
    
    let useHtml2Canvas = false
    
    if (receiptElement) {
      const rect = receiptElement.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(receiptElement)
      
      // Only use html2canvas if element is visible and has content
      if (rect.width > 0 && rect.height > 0 && 
          computedStyle.display !== 'none' && 
          computedStyle.visibility !== 'hidden' &&
          receiptElement.textContent.trim().length > 0) {
        useHtml2Canvas = true
        console.log('Element found and visible, trying html2canvas...')
      } else {
        console.log('Element found but not suitable for html2canvas:', {
          dimensions: { width: rect.width, height: rect.height },
          display: computedStyle.display,
          visibility: computedStyle.visibility,
          hasText: receiptElement.textContent.trim().length > 0
        })
      }
    } else {
      console.log('No receipt element found, using direct PDF generation')
    }
    
    let pdf = null
    
    if (useHtml2Canvas) {
      try {
        console.log('Attempting html2canvas capture...')
        
        const canvas = await html2canvas(receiptElement, {
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: receiptElement.offsetWidth,
          height: receiptElement.offsetHeight,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.body.querySelector('.receipt-preview') || 
                                 clonedDoc.body.querySelector('#receipt-content')
            if (clonedElement) {
              clonedElement.style.position = 'static'
              clonedElement.style.transform = 'none'
              clonedElement.style.visibility = 'visible'
              clonedElement.style.opacity = '1'
              clonedElement.style.background = '#ffffff'
            }
          }
        })
        
        console.log('Canvas generated:', { width: canvas.width, height: canvas.height })
        
        // Check if canvas has content
        const ctx = canvas.getContext('2d')
        const imageData = ctx.getImageData(0, 0, Math.min(50, canvas.width), Math.min(50, canvas.height))
        let hasContent = false
        
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i]
          const g = imageData.data[i + 1] 
          const b = imageData.data[i + 2]
          const a = imageData.data[i + 3]
          
          if (a > 0 && (r < 240 || g < 240 || b < 240)) {
            hasContent = true
            break
          }
        }
        
        if (hasContent && canvas.width > 0 && canvas.height > 0) {
          console.log('Canvas has content, creating PDF from image...')
          
          const imgData = canvas.toDataURL('image/png', 1.0)
          pdf = new jsPDF('p', 'mm', 'a4')
          
          const pdfWidth = 210
          const pdfHeight = 297
          const canvasAspectRatio = canvas.height / canvas.width
          
          let imgWidth = pdfWidth - 20 // margins
          let imgHeight = imgWidth * canvasAspectRatio
          
          if (imgHeight > pdfHeight - 20) {
            imgHeight = pdfHeight - 20
            imgWidth = imgHeight / canvasAspectRatio
          }
          
          const xOffset = (pdfWidth - imgWidth) / 2
          const yOffset = 10
          
          pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight)
        } else {
          console.log('Canvas is blank, falling back to direct PDF generation')
          pdf = null // Force fallback
        }
        
      } catch (canvasError) {
        console.log('html2canvas failed:', canvasError.message)
        pdf = null // Force fallback
      }
    }
    
    // FALLBACK: Create PDF directly from data
    if (!pdf) {
      console.log('Creating PDF directly from data...')
      pdf = createPDFFromData(receiptData, calculations)
    }
    
    // Save the PDF
    const safeReceiptNumber = sanitizeFilename(receiptData.receiptNumber || 'unnamed')
    const safeDate = receiptData.receiptDate || new Date().toISOString().split('T')[0]
    const filename = `receipt-${safeReceiptNumber}-${safeDate}.pdf`
    
    console.log('Saving PDF:', filename)
    pdf.save(filename)
    
    // Reset button
    if (downloadBtn && originalButtonState) {
      updateButtonState(downloadBtn, originalButtonState.text, originalButtonState.disabled)
    }
    
    console.log('PDF generated successfully!')
    return { success: true, filename, format: 'pdf' }
    
  } catch (error) {
    console.error('PDF generation failed completely:', error)
    
    if (downloadBtn) {
      updateButtonState(downloadBtn, 'Download PDF', false)
    }
    
    // Last resort: text download
    if (confirm(`PDF generation failed: ${error.message}\n\nWould you like to download as a text file instead?`)) {
      return downloadTextFallback(receiptData, calculations)
    }
    
    throw error
  }
}

// 🔹 Text fallback
const downloadTextFallback = (receiptData, calculations) => {
  try {
    const { subtotal, tax, total } = calculations || {
      subtotal: 0,
      tax: 0,
      total: 0,
    }

    const receiptText = `
${'='.repeat(50)}
${(receiptData.storeName || 'STORE NAME').toUpperCase()}
${receiptData.storeAddress || 'Store Address'}
Phone: ${receiptData.storePhone || 'Phone Number'}
${receiptData.storeEmail ? `Email: ${receiptData.storeEmail}` : ''}
${receiptData.storeWebsite ? `Website: ${receiptData.storeWebsite}` : ''}
${'='.repeat(50)}

RECEIPT
Receipt #: ${receiptData.receiptNumber || 'Not set'}
Date: ${receiptData.receiptDate || new Date().toISOString().split('T')[0]}
${receiptData.dueDate ? `Due Date: ${receiptData.dueDate}` : ''}
${receiptData.referenceNumber ? `Reference #: ${receiptData.referenceNumber}` : ''}
${receiptData.paymentStatus ? `Payment Status: ${receiptData.paymentStatus.toUpperCase()}` : ''}
${receiptData.paymentMethod ? `Payment Method: ${receiptData.paymentMethod.toUpperCase()}` : ''}

${'='.repeat(50)}
BILL TO:
${receiptData.billTo?.name || 'Customer Name'}
${receiptData.billTo?.company ? `Company: ${receiptData.billTo.company}` : ''}
${receiptData.billTo?.address?.street || 'Street Address'}
${receiptData.billTo?.address?.city || 'City'}, ${
      receiptData.billTo?.address?.state || 'State'
    } ${receiptData.billTo?.address?.zip || 'ZIP'}
${receiptData.billTo?.address?.country || 'Country'}
${receiptData.billTo?.email ? `Email: ${receiptData.billTo.email}` : ''}
${receiptData.billTo?.phone ? `Phone: ${receiptData.billTo.phone}` : ''}
${receiptData.billTo?.taxId ? `Tax ID: ${receiptData.billTo.taxId}` : ''}

${'='.repeat(50)}
ITEMS:
${'Item'.padEnd(25)} ${'Qty'.padEnd(5)} ${'Price'.padEnd(8)} ${'Total'.padEnd(8)}
${'-'.repeat(50)}
${
  receiptData.items && receiptData.items.length > 0
    ? receiptData.items
        .map((item) => {
          const name = (item.name || 'Unnamed Item').substring(0, 24)
          const qty = (item.qty || 0).toString()
          const price = (item.unitPrice || 0).toFixed(2)
          const total = ((item.qty || 0) * (item.unitPrice || 0)).toFixed(2)

          return `${name.padEnd(25)} ${qty.padEnd(5)} $${price.padEnd(7)} $${total}`
        })
        .join('\n')
    : 'No items added'
}

${'='.repeat(50)}
SUBTOTAL: $${subtotal.toFixed(2)}
${
  receiptData.discount && receiptData.discount > 0
    ? `DISCOUNT: -$${receiptData.discount.toFixed(2)}`
    : ''
}
TAX (${receiptData.taxRate || 0}%): $${tax.toFixed(2)}
${'='.repeat(50)}
GRAND TOTAL: $${total.toFixed(2)}
${'='.repeat(50)}
${receiptData.notes && receiptData.notes.trim() ? `
NOTES:
${receiptData.notes}
${'='.repeat(50)}` : ''}

Thank you for your purchase!
Visit us again soon!

Generated by ReceiptGen - ${new Date().toISOString()}
    `.trim()

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    const safeReceiptNumber = sanitizeFilename(receiptData.receiptNumber || 'unnamed')
    const safeDate = receiptData.receiptDate || new Date().toISOString().split('T')[0]

    link.href = url
    link.download = `receipt-${safeReceiptNumber}-${safeDate}.txt`
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return { success: true, filename: link.download, format: 'text' }
  } catch (error) {
    console.error('Error generating text fallback:', error)
    throw new Error('Failed to generate text receipt')
  }
}

// 🔹 Print receipt
const printReceipt = async (receiptData, calculations) => {
  try {
    // Create a print-optimized window
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    
    if (!printWindow) {
      throw new Error('Unable to open print window. Please allow popups.')
    }

    // Generate print-optimized HTML
    const printHTML = generatePrintHTML(receiptData, calculations)
    
    printWindow.document.write(printHTML)
    printWindow.document.close()
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error printing receipt:', error)
    
    // Fallback to regular print
    try {
      const receiptElement = document.querySelector('.receipt-preview') || 
                            document.querySelector('#receipt-content')
      
      if (receiptElement) {
        receiptElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
      
      window.print()
      return { success: true }
    } catch (fallbackError) {
      console.error('Fallback print also failed:', fallbackError)
      throw new Error('Failed to print receipt')
    }
  }
}

// 🔹 Generate print-optimized HTML
const generatePrintHTML = (receiptData, calculations) => {
  const { subtotal, tax, total } = calculations || { subtotal: 0, tax: 0, total: 0 }
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt - ${receiptData.receiptNumber || 'Receipt'}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Courier New', monospace;
      font-size: 12pt;
      line-height: 1.4;
      color: black;
      background: white;
      padding: 20px;
    }
    
    .receipt-container {
      max-width: 400px;
      margin: 0 auto;
      border: 2px solid black;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      border-bottom: 2px solid black;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    
    .store-name {
      font-size: 18pt;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .store-details {
      font-size: 10pt;
      margin-bottom: 3px;
    }
    
    .receipt-title {
      text-align: center;
      font-size: 16pt;
      font-weight: bold;
      margin: 15px 0;
    }
    
    .receipt-info {
      margin-bottom: 15px;
    }
    
    .info-row {
      margin-bottom: 3px;
    }
    
    .section-title {
      font-weight: bold;
      font-size: 12pt;
      margin-bottom: 8px;
      border-bottom: 1px solid black;
      padding-bottom: 2px;
    }
    
    .bill-to {
      margin-bottom: 15px;
    }
    
    .items-table {
      width: 100%;
      margin-bottom: 15px;
    }
    
    .items-header {
      font-weight: bold;
      border-bottom: 1px solid black;
      padding-bottom: 5px;
      margin-bottom: 5px;
    }
    
    .item-row {
      margin-bottom: 3px;
      padding-bottom: 3px;
      border-bottom: 1px dotted #ccc;
    }
    
    .item-name {
      width: 50%;
      display: inline-block;
    }
    
    .item-qty {
      width: 15%;
      text-align: center;
      display: inline-block;
    }
    
    .item-price {
      width: 20%;
      text-align: right;
      display: inline-block;
    }
    
    .item-total {
      width: 15%;
      text-align: right;
      display: inline-block;
      font-weight: bold;
    }
    
    .totals {
      text-align: right;
      margin-bottom: 15px;
    }
    
    .total-row {
      margin-bottom: 5px;
    }
    
    .grand-total {
      border-top: 2px solid black;
      padding-top: 8px;
      font-weight: bold;
      font-size: 14pt;
    }
    
    .notes {
      margin-bottom: 15px;
    }
    
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid black;
    }
    
    .thank-you {
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .generated-by {
      font-size: 8pt;
      color: #666;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .receipt-container {
        border: none;
        padding: 0;
        max-width: none;
      }
      
      @page {
        margin: 0.5in;
        size: A4;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <!-- Header -->
    <div class="header">
      <div class="store-name">${(receiptData.storeName || 'STORE NAME').toUpperCase()}</div>
      ${receiptData.storeAddress ? `<div class="store-details">${receiptData.storeAddress}</div>` : ''}
      ${receiptData.storePhone ? `<div class="store-details">Phone: ${receiptData.storePhone}</div>` : ''}
      ${receiptData.storeEmail ? `<div class="store-details">Email: ${receiptData.storeEmail}</div>` : ''}
      ${receiptData.storeWebsite ? `<div class="store-details">Website: ${receiptData.storeWebsite}</div>` : ''}
    </div>
    
    <!-- Receipt Title -->
    <div class="receipt-title">RECEIPT</div>
    
    <!-- Receipt Info -->
    <div class="receipt-info">
      <div class="info-row"><strong>Receipt #:</strong> ${receiptData.receiptNumber || 'Not set'}</div>
      <div class="info-row"><strong>Date:</strong> ${receiptData.receiptDate || new Date().toISOString().split('T')[0]}</div>
      ${receiptData.dueDate ? `<div class="info-row"><strong>Due Date:</strong> ${receiptData.dueDate}</div>` : ''}
      ${receiptData.referenceNumber ? `<div class="info-row"><strong>Reference #:</strong> ${receiptData.referenceNumber}</div>` : ''}
      ${receiptData.paymentStatus ? `<div class="info-row"><strong>Payment Status:</strong> ${receiptData.paymentStatus.toUpperCase()}</div>` : ''}
      ${receiptData.paymentMethod ? `<div class="info-row"><strong>Payment Method:</strong> ${receiptData.paymentMethod.toUpperCase()}</div>` : ''}
    </div>
    
    <!-- Bill To -->
    <div class="bill-to">
      <div class="section-title">BILL TO:</div>
      <div class="info-row"><strong>${receiptData.billTo?.name || 'Customer Name'}</strong></div>
      ${receiptData.billTo?.company ? `<div class="info-row">Company: ${receiptData.billTo.company}</div>` : ''}
      ${receiptData.billTo?.address?.street ? `<div class="info-row">${receiptData.billTo.address.street}</div>` : ''}
      ${receiptData.billTo?.address?.city || receiptData.billTo?.address?.state || receiptData.billTo?.address?.zip ? 
        `<div class="info-row">${[receiptData.billTo?.address?.city, receiptData.billTo?.address?.state, receiptData.billTo?.address?.zip].filter(Boolean).join(', ')}</div>` : ''}
      ${receiptData.billTo?.address?.country ? `<div class="info-row">${receiptData.billTo.address.country}</div>` : ''}
      ${receiptData.billTo?.email ? `<div class="info-row">Email: ${receiptData.billTo.email}</div>` : ''}
      ${receiptData.billTo?.phone ? `<div class="info-row">Phone: ${receiptData.billTo.phone}</div>` : ''}
      ${receiptData.billTo?.taxId ? `<div class="info-row">Tax ID: ${receiptData.billTo.taxId}</div>` : ''}
    </div>
    
    <!-- Items -->
    <div class="items-section">
      <div class="section-title">ITEMS:</div>
      <div class="items-table">
        <div class="items-header">
          <span class="item-name">Item Description</span>
          <span class="item-qty">Qty</span>
          <span class="item-price">Price</span>
          <span class="item-total">Total</span>
        </div>
        ${receiptData.items && receiptData.items.length > 0 ? 
          receiptData.items.map(item => `
            <div class="item-row">
              <span class="item-name">${item.name || 'Unnamed Item'}</span>
              <span class="item-qty">${item.qty || 0}</span>
              <span class="item-price">${(item.unitPrice || 0).toFixed(2)}</span>
              <span class="item-total">${((item.qty || 0) * (item.unitPrice || 0)).toFixed(2)}</span>
            </div>
          `).join('') : 
          '<div class="item-row"><span class="item-name">No items added</span></div>'
        }
      </div>
    </div>
    
    <!-- Totals -->
    <div class="totals">
      <div class="total-row">
        <strong>SUBTOTAL:</strong> ${subtotal.toFixed(2)}
      </div>
      ${receiptData.discount && receiptData.discount > 0 ? 
        `<div class="total-row"><strong>DISCOUNT:</strong> -${receiptData.discount.toFixed(2)}</div>` : ''}
      <div class="total-row">
        <strong>TAX (${receiptData.taxRate || 0}%):</strong> ${tax.toFixed(2)}
      </div>
      <div class="total-row grand-total">
        <strong>GRAND TOTAL:</strong> ${total.toFixed(2)}
      </div>
    </div>
    
    <!-- Notes -->
    ${receiptData.notes && receiptData.notes.trim() ? `
    <div class="notes">
      <div class="section-title">NOTES:</div>
      <div>${receiptData.notes}</div>
    </div>
    ` : ''}
    
    <!-- Footer -->
    <div class="footer">
      <div class="thank-you">Thank you for your purchase!</div>
      <div>Visit us again soon!</div>
      <div class="generated-by">Generated by ReceiptGen - ${new Date().toLocaleString()}</div>
    </div>
  </div>
</body>
</html>
  `
}

// 🔹 Debug function
const testPDFGeneration = (receiptData, calculations) => {
  console.log('Testing PDF generation with sample data...')
  
  const testData = receiptData || {
    storeName: 'Test Store',
    storeAddress: '123 Test St, Test City, TC 12345',
    storePhone: '(555) 123-4567',
    receiptNumber: 'TEST-001',
    receiptDate: new Date().toISOString().split('T')[0],
    billTo: {
      name: 'Test Customer',
      address: {
        street: '456 Customer Ave',
        city: 'Customer City',
        state: 'CC',
        zip: '67890'
      }
    },
    items: [
      { name: 'Test Item 1', qty: 2, unitPrice: 10.00 },
      { name: 'Test Item 2', qty: 1, unitPrice: 25.50 }
    ],
    taxRate: 8.25,
    discount: 0
  }
  
  const testCalc = calculations || {
    subtotal: 45.50,
    tax: 3.75,
    total: 49.25
  }
  
  try {
    const pdf = createPDFFromData(testData, testCalc)
    pdf.save('test-receipt.pdf')
    console.log('Test PDF generated successfully!')
    return true
  } catch (error) {
    console.error('Test PDF generation failed:', error)
    return false
  }
}

export const downloadService = {
  downloadReceipt,
  printReceipt,
  testPDFGeneration, // For testing
}