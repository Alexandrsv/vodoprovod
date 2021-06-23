import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {boardReducer} from "./board-reducer";



const rootReducer = combineReducers({
    boardReducer
})

const store = createStore(rootReducer)

window.__store__ = store
export default store
