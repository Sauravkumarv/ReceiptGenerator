// components/ReceiptDashboard.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Receipt, Search, Filter, DollarSign, Store, FileText, Eye, Download,
  User, TrendingUp, Calendar, MapPin, ChevronDown, Grid, List, X, Edit3, Trash2
} from 'lucide-react';
import receiptService from '../../services/receiptService';

// Utility functions
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount / 100);

const formatDateShort = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const formatDateFull = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', { 
    year: 'numeric', month: 'short', day: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  });

// Loading skeleton with better animation
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex space-x-4">
      <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Enhanced Receipt Card with hover effects
const ReceiptCard = React.memo(({ receipt, onView, onDownload, viewMode }) => (
  <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
          <Receipt className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
            {receipt.receiptNumber}
          </h3>
          <div className="flex items-center space-x-1 mt-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <p className="text-xs text-gray-500">{formatDateShort(receipt.createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onView(receipt)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
          title="View Receipt"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDownload(receipt)}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-110"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
        <MapPin className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className="text-sm text-gray-700 truncate font-medium">{receipt.storeName}</span>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">Total</span>
        </div>
        <span className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
          {formatCurrency(receipt.total)}
        </span>
      </div>

      {receipt.tax > 0 && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Tax</span>
          <span className="text-gray-600 font-medium">{formatCurrency(receipt.tax)}</span>
        </div>
      )}
    </div>
  </div>
));

ReceiptCard.displayName = 'ReceiptCard';

// Enhanced Stats Card
const StatsCard = ({ icon: Icon, title, value, subtitle, color = "blue", trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
            {value}
          </p>
          <p className="text-sm text-gray-600">{title}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {trend && (
        <div className="flex items-center space-x-1">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-xs text-green-600 font-medium">+{trend}%</span>
        </div>
      )}
    </div>
  </div>
);

const ReceiptDashboard = () => {
  const [user, setUser] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  // Load user & receipts
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await receiptService.getUserData();
        setUser(userData);

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

  // Filter & sort with enhanced logic
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

  // Enhanced totals with calculations
  const stats = useMemo(() => {
    const totalAmount = receipts.reduce((sum, r) => sum + r.total, 0);
    const totalTax = receipts.reduce((sum, r) => sum + r.tax, 0);
    const uniqueStores = new Set(receipts.map((r) => r.storeName)).size;
    const avgAmount = receipts.length > 0 ? totalAmount / receipts.length : 0;
    
    return {
      totalAmount,
      totalTax,
      uniqueStores,
      avgAmount,
      totalReceipts: receipts.length
    };
  }, [receipts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-purple-300 mx-auto animate-ping"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Loading your receipts...</p>
            <div className="mt-8 max-w-md mx-auto">
              <LoadingSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Header */}
        {user && (
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
            
            <div className="relative p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                        {user.fullName}
                      </h1>
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        PREMIUM
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">{user.email}</p>
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Member since {formatDateShort(user.createdAt || new Date())}</span>
                      </div>
                      <div className="h-4 w-px bg-gray-300"></div>
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">Active Account</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Professional Actions */}
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm">
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200 font-medium">
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total Receipts"
            value={stats.totalReceipts}
            color="blue"
          />
          <StatsCard
            icon={DollarSign}
            title="Total Amount"
            value={formatCurrency(stats.totalAmount)}
            subtitle={`Avg: ${formatCurrency(stats.avgAmount)}`}
            color="green"
          />
          <StatsCard
            icon={Receipt}
            title="Total Tax"
            value={formatCurrency(stats.totalTax)}
            subtitle={`${((stats.totalTax / stats.totalAmount) * 100 || 0).toFixed(1)}% of total`}
            color="purple"
          />
          <StatsCard
            icon={Store}
            title="Unique Stores"
            value={stats.uniqueStores}
            color="orange"
          />
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search receipts or stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="store">Sort by Store</option>
                    <option value="receipt">Sort by Receipt No.</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Receipt Management Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with Analytics */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Receipt Management</h2>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{filteredAndSortedReceipts.length} receipts found</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Professional Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Search and Filter Bar */}
          <div className="bg-white border-b border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search receipts, stores, or amounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer font-medium min-w-[140px]"
                  >
                    <option value="date">Date (Newest)</option>
                    <option value="amount">Amount (Highest)</option>
                    <option value="store">Store (A-Z)</option>
                    <option value="receipt">Receipt Number</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {filteredAndSortedReceipts.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center">
                    <Receipt className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Search className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {searchTerm ? 'No matching receipts found' : 'No receipts available'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
                  {searchTerm 
                    ? 'Try adjusting your search terms or clearing filters to see more results.' 
                    : 'Start building your receipt collection by uploading your first receipt. Track expenses, manage taxes, and stay organized.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-blue-800">
                      <span className="font-semibold">
                        Showing {filteredAndSortedReceipts.length} of {receipts.length} receipts
                      </span>
                      {searchTerm && (
                        <span className="text-blue-600">
                          • Search: "{searchTerm}"
                        </span>
                      )}
                    </div>
                    <div className="text-blue-600 font-medium">
                      Total: {formatCurrency(filteredAndSortedReceipts.reduce((sum, r) => sum + r.total, 0))}
                    </div>
                  </div>
                </div>

                {/* Receipt Grid/List */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {filteredAndSortedReceipts.map((receipt) => (
                    <ReceiptCard
                      key={receipt._id}
                      receipt={receipt}
                      onView={handleView}
                      onDownload={handleDownload}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDashboard;