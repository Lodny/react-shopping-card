const { CREATE_ORDER, CLEAR_ORDER, CLEAR_CART } = require("../types");

export const orderReducer = (state = {}, action) => {
  // if (state === undefined) {
  //   state = { items: JSON.parse(localStorage.getItem("cartItems")) || [] };
  // }

  console.log("orderReducer() : ", state, action);
  // let items = null;

  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };

    case CLEAR_ORDER:
      return { order: null };

    default:
      return state;
  }
};
