import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, Send, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting you back...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Contact Support</h1>
          <p className="text-gray-600 mt-2">Need help with Receipt Generator? We're here to assist you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">support@receiptgen.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Support Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Common Issues</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h3 className="font-medium text-gray-800">Receipt not generating?</h3>
                  <p className="text-sm text-gray-600">Check your browser settings and ensure JavaScript is enabled.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3">
                  <h3 className="font-medium text-gray-800">Need to edit a receipt?</h3>
                  <p className="text-sm text-gray-600">Use the edit feature in your dashboard or create a new one.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <h3 className="font-medium text-gray-800">Export issues?</h3>
                  <p className="text-sm text-gray-600">Try clearing your browser cache or using a different browser.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="billing">Billing Question</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Please describe your issue or question in detail..."
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Fields marked with * are required
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center cursor-pointer"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Help Section */}
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-semibold">Need Immediate Help?</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Check out our comprehensive documentation and video tutorials for quick solutions.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  View Documentation
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Watch Tutorials
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}