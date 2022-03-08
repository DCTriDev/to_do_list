import {combineReducers} from "redux";
import toDoReducer from "./ToDoReducer";

const rootReducer = combineReducers({
    toDoReducer,
})

export default rootReducer;