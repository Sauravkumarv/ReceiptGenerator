import { RECEIPT_ACTIONS } from '@/utils/constants'

export const receiptReducer = (state, action) => {
  switch (action.type) {
    case RECEIPT_ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    
    case RECEIPT_ACTIONS.UPDATE_NESTED_FIELD:
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.field]: action.value
        }
      }
    
    case RECEIPT_ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { name: '', qty: 1, unitPrice: 0 }]
      }
    
    case RECEIPT_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.index)
      }
    
    case RECEIPT_ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? { ...item, [action.field]: action.value }
            : item
        )
      }
    
    case RECEIPT_ACTIONS.RESET:
      return action.initialState
    
    case RECEIPT_ACTIONS.LOAD_TEMPLATE:
      return {
        ...state,
        ...action.template
      }
    
    default:
      return state
  }
}