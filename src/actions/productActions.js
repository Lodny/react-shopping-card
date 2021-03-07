import { FETCH_PRODUCTS } from "../types";
import { FILTER_BY_SIZE } from "../types";
import { ORDER_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
  console.log(`Action : ${FETCH_PRODUCTS} : fetchProducts()`);
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  console.log(`Action : ${FILTER_BY_SIZE} : filterProducts()`, size, products);
  dispatch({
    type: FILTER_BY_SIZE,
    payload: {
      size: size,
      products:
        size === "All"
          ? products
          : products.filter((product) => product.availableSizes.includes(size))
    }
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  console.log(`Action : ${ORDER_BY_PRICE} : sortProducts()`);
  const sortedProducteds = [...filteredProducts];
  // const sortedProducteds = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducteds.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducteds.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }

  dispatch({
    type: ORDER_BY_PRICE,
    payload: {
      sort: sort,
      products: sortedProducteds
    }
  });
};
