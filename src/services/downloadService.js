import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const downloadService = {
  downloadReceipt: async (receiptData, calculations) => {
    try {
      // Try multiple selectors to find the receipt element
      let receiptElement = document.querySelector('.receipt-preview')
      if (!receiptElement) {
        receiptElement = document.querySelector('#receipt-content')
      }
      if (!receiptElement) {
        // Try to find any element with receipt content
        const elements = document.querySelectorAll('*')
        for (let el of elements) {
          if (el.textContent && el.textContent.includes('RECEIPT') && el.textContent.includes('BILL TO:')) {
            receiptElement = el
            break
          }
        }
      }
      
      if (!receiptElement) {
        console.error('Receipt preview element not found')
        alert('Could not find receipt element. Please try refreshing the page.')
        return
      }

      // Show loading message - fix button detection
      const downloadBtn = document.querySelector('button')?.textContent?.includes('Download PDF') ? 
                         document.querySelector('button') : 
                         Array.from(document.querySelectorAll('button')).find(btn => 
                           btn.textContent.includes('Download PDF')
                         )
      
      if (downloadBtn) {
        const originalText = downloadBtn.textContent
        downloadBtn.textContent = 'Generating PDF...'
        downloadBtn.disabled = true
      }

      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 200))

      // Create canvas from the receipt element with better settings
      const canvas = await html2canvas(receiptElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: receiptElement.scrollWidth || receiptElement.offsetWidth,
        height: receiptElement.scrollHeight || receiptElement.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: receiptElement.scrollWidth || receiptElement.offsetWidth,
        windowHeight: receiptElement.scrollHeight || receiptElement.offsetHeight,
        foreignObjectRendering: false,
        removeContainer: true
      })

      // Convert canvas to PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Calculate dimensions to fit the receipt properly
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      // Add the receipt image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      
      // If the receipt is longer than one page, add new pages
      let heightLeft = imgHeight
      let position = 0
      
      while (heightLeft >= pageHeight) {
        position = heightLeft - pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Generate filename
      const filename = `receipt-${receiptData.receiptNumber || 'unnamed'}-${receiptData.receiptDate || new Date().toISOString().split('T')[0]}.pdf`
      
      // Download the PDF
      pdf.save(filename)
      
      // Reset button
      if (downloadBtn) {
        downloadBtn.textContent = originalText
        downloadBtn.disabled = false
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('PDF generation failed. Downloading as text file instead.')
      // Fallback to text download if PDF generation fails
      this.downloadTextFallback(receiptData, calculations)
    }
  },

  downloadTextFallback: (receiptData, calculations) => {
    const { subtotal, tax, total } = calculations
    
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

${'='.repeat(50)}
BILL TO:
${receiptData.billTo.name || 'Customer Name'}
${receiptData.billTo.company ? `Company: ${receiptData.billTo.company}` : ''}
${receiptData.billTo.address.street || 'Street Address'}
${receiptData.billTo.address.city || 'City'}, ${receiptData.billTo.address.state || 'State'} ${receiptData.billTo.address.zip || 'ZIP'}
${receiptData.billTo.address.country || 'Country'}
${receiptData.billTo.email ? `Email: ${receiptData.billTo.email}` : ''}
${receiptData.billTo.phone ? `Phone: ${receiptData.billTo.phone}` : ''}

${'='.repeat(50)}
ITEMS:
${'Item'.padEnd(25)} ${'Qty'.padEnd(5)} ${'Price'.padEnd(8)} ${'Total'.padEnd(8)}
${'-'.repeat(50)}
${receiptData.items.length > 0 ? receiptData.items.map(item => 
  `${(item.name || 'Unnamed Item').padEnd(25)} ${(item.qty || 0).toString().padEnd(5)} $${(item.unitPrice || 0).toFixed(2).padEnd(7)} $${((item.qty || 0) * (item.unitPrice || 0)).toFixed(2)}`
).join('\n') : 'No items added'}

${'='.repeat(50)}
SUBTOTAL: $${subtotal.toFixed(2)}
${receiptData.discount > 0 ? `DISCOUNT: $${receiptData.discount.toFixed(2)}` : ''}
TAX (${receiptData.taxRate || 0}%): $${tax.toFixed(2)}
${'='.repeat(50)}
GRAND TOTAL: $${total.toFixed(2)}
${'='.repeat(50)}

Thank you for your purchase!
Visit us again soon!

Generated by ReceiptGen
    `

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receipt-${receiptData.receiptNumber || 'unnamed'}-${receiptData.receiptDate || new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  printReceipt: () => {
    // Simple print function that works with CSS print media
    window.print()
  }
}