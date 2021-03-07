import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  console.log("Action : FETCH_PRODUCTS : fetchProducts()");
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data
  });
};
