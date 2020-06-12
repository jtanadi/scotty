import { createStore } from "redux"
import combineReducer from "./reducers"

export default createStore(combineReducer)
