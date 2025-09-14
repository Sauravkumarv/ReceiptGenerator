import React from 'react'
import { Package, Plus, Upload } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import { useReceiptCalculations } from '@/hooks/useReceiptCalculations'
import FormSection from '@/components/common/FormSection'
import Button from '@/components/common/Button'
import ItemRow from '../ItemRow'

const ItemsSection = () => {
  const { state, dispatch } = useReceipt()
  const { subtotal } = useReceiptCalculations(state)

  const handleAddItem = () => {
    dispatch({ type: RECEIPT_ACTIONS.ADD_ITEM })
  }

  const handleBulkImport = () => {
    // Future implementation for CSV import
    console.log('Bulk import feature coming soon')
  }

  const handleAddMultipleItems = () => {
    // Add 3 empty items at once
    for (let i = 0; i < 3; i++) {
      dispatch({ type: RECEIPT_ACTIONS.ADD_ITEM })
    }
  }

  return (
    <FormSection 
      title="Items & Services" 
      icon={Package}
      description={`${state.items.length} items • Subtotal: ${subtotal.toFixed(2)}`}
    >
      {/* Items Header */}
      <div className="grid grid-cols-12 gap-3 px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
        <div className="col-span-1"></div>
        <div className="col-span-4">Item Description</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Unit Price</div>
        <div className="col-span-2 text-center">Total</div>
        <div className="col-span-1"></div>
      </div>

      {/* Items List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {state.items.map((item, index) => (
          <ItemRow key={index} item={item} index={index} />
        ))}
        
        {state.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No items added yet</p>
            <p className="text-sm">Click "Add Item" to get started</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        <Button
          variant="success"
          size="sm"
          onClick={handleAddItem}
          icon={Plus}
        >
          Add Item
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddMultipleItems}
          icon={Plus}
        >
          Add 3 Items
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleBulkImport}
          icon={Upload}
        >
          Bulk Import
        </Button>
        
        {state.items.length > 0 && (
          <div className="ml-auto text-sm text-gray-600 flex items-center">
            <span className="font-semibold">Items: {state.items.length}</span>
          </div>
        )}
      </div>
    </FormSection>
  )
}

export default ItemsSection