// components/ReceiptDashboard.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Receipt, Search, Filter, DollarSign, Store, FileText, Eye, Download } from 'lucide-react';
import receiptService from '../../services/receiptService';

// Utility functions
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount / 100);

const formatDateShort = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

// Receipt Card
const ReceiptCard = React.memo(({ receipt, onView, onDownload }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-blue-50 rounded">
          <Receipt className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{receipt.receiptNumber}</h3>
          <p className="text-xs text-gray-500">{formatDateShort(receipt.createdAt)}</p>
        </div>
      </div>
      <div className="flex space-x-1">
        <button
          onClick={() => onView(receipt)}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="View Receipt"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDownload(receipt)}
          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
          title="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        <Store className="h-3.5 w-3.5 text-gray-400" />
        <span className="text-sm text-gray-700 truncate">{receipt.storeName}</span>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">Total Amount</span>
        <span className="text-sm font-semibold text-gray-900">{formatCurrency(receipt.total)}</span>
      </div>
    </div>
  </div>
));

ReceiptCard.displayName = 'ReceiptCard';

const ReceiptDashboard = () => {
  const [user, setUser] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Load user & receipts
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await receiptService.getUserData();
        setUser(userData);

        console.log(userData)

        const receiptData = await receiptService.getReceipts(userData._id);
        setReceipts(receiptData.receipts);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // View receipt
  const handleView = useCallback((receipt) => window.open(receipt.fileUrl, '_blank'), []);

  // Download receipt
  const handleDownload = useCallback((receipt) => {
    const link = document.createElement('a');
    link.href = receipt.fileUrl;
    link.download = receipt.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Filter & sort
  const filteredAndSortedReceipts = useMemo(() => {
    let filtered = receipts.filter(
      (r) =>
        r.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'store':
          return a.storeName.localeCompare(b.storeName);
        case 'amount':
          return b.total - a.total;
        case 'receipt':
          return a.receiptNumber.localeCompare(b.receiptNumber);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [receipts, searchTerm, sortBy]);

  // Totals
  const totalAmount = receipts.reduce((sum, r) => sum + r.total, 0);
  const totalTax = receipts.reduce((sum, r) => sum + r.tax, 0);
  const totalSubtotal = receipts.reduce((sum, r) => sum + r.subtotal, 0);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading receipts...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        {user && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border flex items-center space-x-4">
            <img
              className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
             
              alt={user.name}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{receipts.length}</p>
              <p className="text-gray-600">Total Receipts</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(totalAmount)}</p>
              <p className="text-gray-600">Total Amount</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Receipt className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(totalTax)}</p>
              <p className="text-gray-600">Total Tax</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border flex items-center">
            <div className="p-3 rounded-full bg-orange-100 mr-4">
              <Store className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(receipts.map((r) => r.storeName)).size}
              </p>
              <p className="text-gray-600">Unique Stores</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search receipts or stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="store">Sort by Store</option>
              <option value="receipt">Sort by Receipt No.</option>
            </select>
          </div>
        </div>

        {/* Receipt Grid */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Receipt History</h2>

            {filteredAndSortedReceipts.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? 'No receipts found matching your search.' : 'No receipts available.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAndSortedReceipts.map((receipt) => (
                  <ReceiptCard
                    key={receipt._id}
                    receipt={receipt}
                    onView={handleView}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDashboard;
