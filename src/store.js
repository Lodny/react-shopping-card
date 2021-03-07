import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducer";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_CPMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productReducer
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
