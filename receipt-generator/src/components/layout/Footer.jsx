import React from 'react'
import { Receipt, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ReceiptGen</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Create professional receipts quickly and easily. Perfect for small businesses, 
              freelancers, and anyone who needs to generate receipts on the go.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Features Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Custom Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">PDF Export</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Multiple Currencies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tax Calculations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bulk Generation</a></li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: support@receiptgen.com</p>
              <p>Phone: +1-800-RECEIPT</p>
              <p>Hours: Mon-Fri 9AM-6PM EST</p>
              <div className="mt-4">
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">Documentation</a>
              </div>
              <div>
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">API Reference</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">&copy; 2024 ReceiptGen. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer