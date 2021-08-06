import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";

let rootReducer = combineReducers({
  Auth: authReducer,
});

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
