const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } = require("../types");

export const cartReducer = (state, action) => {
  if (state === undefined) {
    state = { items: JSON.parse(localStorage.getItem("cartItems")) || [] };
  }

  console.log("cartReducer() : ", state, action);
  let items = null;

  switch (action.type) {
    case ADD_TO_CART:
      items = [...state.items];
      let alreadyInCart = false;
      items.forEach((item) => {
        if (item._id === action.payload.product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });

      if (!alreadyInCart) {
        items.push({ ...action.payload.product, count: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(items));

      return {
        ...state,
        items: items
      };

    case REMOVE_FROM_CART:
      items = state.items.filter((item) => item._id !== action.payload.product._id);

      localStorage.setItem("cartItems", JSON.stringify(items));

      return {
        ...state,
        items: items
      };

    case CLEAR_CART:
      // return { items: null };
      return {};

    default:
      return state;
  }
};
