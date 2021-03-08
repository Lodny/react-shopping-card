import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_CPMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productReducer,
    cart: cartReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
