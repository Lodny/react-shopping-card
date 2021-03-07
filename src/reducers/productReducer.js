const { FETCH_PRODUCTS } = require("../types");

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      // console.log("Reducer : ", action.type);
      // console.log(state);
      // console.log(action.payload);
      return { items: action.payload };
    default:
      return state;
  }
};
