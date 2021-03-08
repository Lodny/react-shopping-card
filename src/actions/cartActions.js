import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  console.log(`Action : ${ADD_TO_CART} : addToCart() : `, product);
  // console.log("addToCart() : getState() : ", getState());

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product,
    },
  });
};

export const removeFromCart = (product) => (dispatch) => {
  console.log(`Action : ${REMOVE_FROM_CART} : removeFromCart() : `, product);

  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      product: product,
    },
  });
};
