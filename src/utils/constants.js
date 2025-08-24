export const RECEIPT_ACTIONS = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  UPDATE_NESTED_FIELD: 'UPDATE_NESTED_FIELD',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  RESET: 'RESET',
  LOAD_TEMPLATE: 'LOAD_TEMPLATE'
}

export const INITIAL_STATE = {
  storeName: 'ABC RETAIL STORE',
  storeAddress: '123 Main Street, Hometown',
  storePhone: '+1-234-567-8901',
  receiptNumber: '00123',
  date: new Date().toISOString().split('T')[0],
  billTo: {
    name: 'John Doe',
    address: '789 Market Avenue, Hometown',
    email: 'john.doe@example.com'
  },
  items: [
    { name: 'Widget A', qty: 2, unitPrice: 15.00 },
    { name: 'Widget B', qty: 1, unitPrice: 25.00 }
  ],
  discount: 5.50,
  taxRate: 7.2
}

export const RECEIPT_TEMPLATES = {
  RETAIL: {
    name: 'Retail Store',
    ...INITIAL_STATE
  },
  RESTAURANT: {
    name: 'Restaurant',
    storeName: 'Delicious Diner',
    storeAddress: '456 Food Street, Tastytown',
    storePhone: '+1-234-567-8902',
    items: [
      { name: 'Burger Meal', qty: 2, unitPrice: 12.99 },
      { name: 'Soft Drink', qty: 2, unitPrice: 2.99 }
    ]
  },
  SERVICE: {
    name: 'Service Provider',
    storeName: 'Professional Services LLC',
    storeAddress: '789 Business Ave, Corporate City',
    storePhone: '+1-234-567-8903',
    items: [
      { name: 'Consultation', qty: 2, unitPrice: 100.00 },
      { name: 'Setup Fee', qty: 1, unitPrice: 50.00 }
    ]
  }
}

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Receipt Generator',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Professional Receipt Generator',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  enablePdfExport: import.meta.env.VITE_ENABLE_PDF_EXPORT === 'true',
  enableTemplates: import.meta.env.VITE_ENABLE_TEMPLATES !== 'false'
}