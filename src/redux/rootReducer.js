import { combineReducers } from "@reduxjs/toolkit";
// подключаем слайсы
import { cartReducer } from "./slices/cartSlice";
import { filterReducer } from "./slices/filterSlice";
import { userReducer } from "./slices/userSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  filter: filterReducer,
});


