import { FETCH_PRODUCTS } from "../types";
import { FILTER_BY_SIZE } from "../types";
import { ORDER_BY_PRICE } from "../types";

// local func ---------------------------
function sortLocalFunc(products, sort) {
  const sorted = [...products];
  if (sort === "latest") {
    sorted.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sorted.sort((a, b) => (sort === "lowest" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)));
  }

  return sorted;
}

// action ---------------------------
export const fetchProducts = () => async (dispatch) => {
  console.log(`Action : ${FETCH_PRODUCTS} : fetchProducts()`);
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: {
      products: data,
    },
  });
};

export const filterProducts = (products, size, sort) => (dispatch) => {
  console.log(`Action : ${FILTER_BY_SIZE} : filterProducts()`, size, sort, products);

  const filtered = size === "All" ? products : products.filter((product) => product.availableSizes.includes(size));

  dispatch({
    type: FILTER_BY_SIZE,
    payload: {
      size: size,
      products: sortLocalFunc(filtered, sort),
    },
  });
};

export const sortProducts = (products, sort) => (dispatch) => {
  console.log(`Action : ${ORDER_BY_PRICE} : sortProducts()`);

  dispatch({
    type: ORDER_BY_PRICE,
    payload: {
      sort: sort,
      products: sortLocalFunc(products, sort),
    },
  });
};
