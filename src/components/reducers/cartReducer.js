import {
  GET_ITEMS,
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
} from "../actions/action-types/cart-actions";

const initState = {
  items: [],
  addedItems: [],
  total: 0,
};
const cartReducer = (state = initState, action) => {
  let addedItem, newTotal;
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.data,
      };
    case ADD_TO_CART:
      addedItem = state.items.find((item) => item.id === action.id);
      let existed_item = state.addedItems.find((item) => action.id === item.id);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.price,
        };
      } else {
        addedItem.quantity = 1;
        newTotal = state.total + addedItem.price;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }
    case REMOVE_ITEM:
      let itemToRemove = state.addedItems.find((item) => action.id === item.id);
      let new_items = state.addedItems.filter((item) => action.id !== item.id);

      newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    case ADD_QUANTITY:
      addedItem = state.items.find((item) => item.id === action.id);
      addedItem.quantity += 1;
      newTotal = state.total + addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    case SUB_QUANTITY:
      addedItem = state.items.find((item) => item.id === action.id);
      if (addedItem.quantity === 1) {
        let new_items = state.addedItems.filter(
          (item) => item.id !== action.id
        );
        let newTotal = state.total - addedItem.price;
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
        };
      } else {
        addedItem.quantity -= 1;
        let newTotal = state.total - addedItem.price;
        return {
          ...state,
          total: newTotal,
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
