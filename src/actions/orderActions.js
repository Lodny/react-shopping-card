import { CREATE_ORDER, CLEAR_ORDER, CLEAR_CART } from "../types";

export const createOrder = (order) => (dispatch) => {
  console.log(`Action : ${CREATE_ORDER} : createOrder() : `, order);

  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CREATE_ORDER, payload: data });
      localStorage.clear("cartItems");
      // dispatch({ type: CLEAR_CART });
    });
};

export const clearOrder = () => (dispatch) => {
  console.log(`Action : ${CLEAR_ORDER} : clearOrder() : `);

  dispatch({ type: CLEAR_ORDER });
  dispatch({ type: CLEAR_CART });
};
