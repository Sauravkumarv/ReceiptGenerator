import React, { useState } from 'react'
import { 
  HelpCircle, 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  Store, 
  User, 
  ShoppingCart, 
  Calculator,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

const HelpPage = () => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: HelpCircle,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Welcome to ReceiptGen!</h4>
                <p className="text-blue-700 text-sm">
                  This tool helps you create professional receipts quickly and easily. 
                  Follow the steps below to generate your first receipt.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <p className="text-gray-700">Fill in your store information (name, address, contact details)</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <p className="text-gray-700">Add customer details and billing information</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <p className="text-gray-700">Add items to your receipt with quantities and prices</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
              <p className="text-gray-700">Set tax rates and apply discounts if needed</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
              <p className="text-gray-700">Download, print, or share your receipt</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'store-info',
      title: 'Store Information',
      icon: Store,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Required Fields</h4>
                <p className="text-green-700 text-sm">
                  Store name is required. All other fields are optional but recommended for professional receipts.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Store Name</h5>
              <p className="text-gray-600 text-sm">Your business name as it should appear on receipts</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Address</h5>
              <p className="text-gray-600 text-sm">Complete business address for customer reference</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Contact Information</h5>
              <p className="text-gray-600 text-sm">Phone, email, and website for customer inquiries</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'customer-info',
      title: 'Customer Information',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Required Field</h4>
                <p className="text-yellow-700 text-sm">
                  Customer name is required. All other fields are optional.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Customer Name</h5>
              <p className="text-gray-600 text-sm">The name of the person or business receiving the receipt</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Company Information</h5>
              <p className="text-gray-600 text-sm">Company name and tax ID for business customers</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Billing Address</h5>
              <p className="text-gray-600 text-sm">Complete address for billing and shipping purposes</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Contact Details</h5>
              <p className="text-gray-600 text-sm">Email and phone for follow-up communications</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'items',
      title: 'Adding Items',
      icon: ShoppingCart,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Required</h4>
                <p className="text-red-700 text-sm">
                  You must add at least one item with a name to generate a receipt.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Item Name</h5>
              <p className="text-gray-600 text-sm">Description of the product or service</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Quantity</h5>
              <p className="text-gray-600 text-sm">Number of units (defaults to 1 if not specified)</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Unit Price</h5>
              <p className="text-gray-600 text-sm">Price per unit (can be $0.00 for free items)</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Total Calculation</h5>
              <p className="text-gray-600 text-sm">Automatically calculated as Quantity × Unit Price</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Tips:</h5>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Use clear, descriptive item names</li>
              <li>• Add items one at a time for better organization</li>
              <li>• You can remove items by clicking the remove button</li>
              <li>• Empty items are automatically filtered out</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'tax-discount',
      title: 'Tax & Discounts',
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Tax Rate</h5>
              <p className="text-gray-600 text-sm">Enter the tax percentage (e.g., 8.25 for 8.25%)</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Discount Amount</h5>
              <p className="text-gray-600 text-sm">Enter the discount amount in dollars (e.g., 10.00 for $10 off)</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Quick Discount Buttons</h5>
              <p className="text-gray-600 text-sm">Use 5%, 10%, or 15% buttons to quickly apply percentage discounts</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-semibold text-blue-800 mb-2">Calculation Order:</h5>
            <ol className="text-blue-700 text-sm space-y-1">
              <li>1. Calculate subtotal from all items</li>
              <li>2. Apply discount (if any)</li>
              <li>3. Calculate tax on discounted amount</li>
              <li>4. Add tax to get final total</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'download-print',
      title: 'Download & Print',
      icon: Download,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Download PDF</h5>
              <p className="text-gray-600 text-sm">Generate a professional PDF receipt with all your information</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Print Receipt</h5>
              <p className="text-gray-600 text-sm">Print a clean, receipt-only version without page elements</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Share Receipt</h5>
              <p className="text-gray-600 text-sm">Share receipt details via email or copy to clipboard</p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-800 mb-2">Requirements:</h5>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Store name must be filled</li>
              <li>• Customer name must be filled</li>
              <li>• At least one item with a name must be added</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: AlertCircle,
      content: (
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h5 className="font-semibold text-red-800 mb-2">Download Issues</h5>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Ensure all required fields are filled</li>
                <li>• Check if pop-ups are blocked in your browser</li>
                <li>• Try refreshing the page and trying again</li>
                <li>• Use a modern browser (Chrome, Firefox, Safari, Edge)</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-800 mb-2">Print Issues</h5>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Allow pop-ups for print functionality</li>
                <li>• Check printer settings and paper size</li>
                <li>• Try the browser's print preview first</li>
                <li>• Ensure receipt content is visible before printing</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">General Issues</h5>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Clear browser cache and cookies</li>
                <li>• Disable browser extensions temporarily</li>
                <li>• Check internet connection</li>
                <li>• Try in an incognito/private window</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about creating professional receipts with ReceiptGen
          </p>
        </div>

        {/* Help Sections */}
        <div className="space-y-4">
          {helpSections.map((section) => {
            const isExpanded = expandedSections[section.id]
            const Icon = section.icon
            
            return (
              <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-blue-600 mr-3" />
                      <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="pt-4">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you can't find the answer you're looking for, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Report a Bug
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage

