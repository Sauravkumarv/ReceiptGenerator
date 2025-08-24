import React from 'react'
import { Trash2, Grip } from 'lucide-react'
import { useReceipt } from '@/context/ReceiptContext'
import { RECEIPT_ACTIONS } from '@/utils/constants'
import Input from '@/components/common/Input'

const ItemRow = ({ item, index }) => {
  const { dispatch } = useReceipt()

  const handleItemChange = (field, value) => {
    let processedValue = value
    
    if (field === 'qty') {
      processedValue = Math.max(0, parseInt(value) || 0)
    } else if (field === 'unitPrice') {
      processedValue = Math.max(0, parseFloat(value) || 0)
    }

    dispatch({
      type: RECEIPT_ACTIONS.UPDATE_ITEM,
      index,
      field,
      value: processedValue
    })
  }

  const handleRemoveItem = () => {
    dispatch({
      type: RECEIPT_ACTIONS.REMOVE_ITEM,
      index
    })
  }

  const itemTotal = (item.qty * item.unitPrice).toFixed(2)

  return (
    <div className="grid grid-cols-12 gap-3 items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
      {/* Drag Handle */}
      <div className="col-span-1 flex justify-center">
        <Grip className="h-4 w-4 text-gray-400 cursor-move" />
      </div>

      {/* Item Name */}
      <div className="col-span-4">
        <Input
          type="text"
          placeholder="Item name"
          value={item.name}
          onChange={(e) => handleItemChange('name', e.target.value)}
          className="text-sm"
        />
      </div>

      {/* Quantity */}
      <div className="col-span-2">
        <Input
          type="number"
          min="0"
          placeholder="Qty"
          value={item.qty}
          onChange={(e) => handleItemChange('qty', e.target.value)}
          className="text-sm text-center"
        />
      </div>

      {/* Unit Price */}
      <div className="col-span-2">
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={item.unitPrice}
          onChange={(e) => handleItemChange('unitPrice', e.target.value)}
          className="text-sm"
        />
      </div>

      {/* Total */}
      <div className="col-span-2 text-center">
        <span className="font-semibold text-gray-800">
          ${itemTotal}
        </span>
      </div>

      {/* Remove Button */}
      <div className="col-span-1 flex justify-center">
        <button
          onClick={handleRemoveItem}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          title="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default ItemRow