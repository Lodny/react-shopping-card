const { FETCH_PRODUCTS, FILTER_BY_SIZE, ORDER_BY_PRICE } = require("../types");

export const productReducer = (state = {}, action) => {
  console.log("productReducer() : ", state, action);

  switch (action.type) {
    case FETCH_PRODUCTS:
      // console.log("Reducer : ", action.type);
      // console.log(state);
      // console.log(action.payload);
      return { products: action.payload, filteredItems: action.payload };

    case FILTER_BY_SIZE:
      // console.log(state);
      return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.products
      };

    case ORDER_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.products
      };

    default:
      return state;
  }
};
