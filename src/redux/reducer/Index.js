import { combineReducers } from "redux";
import loginsignupReducer from "./LoginReducer";
import TodoReducer from "./TodoReducer";

// const appReducer = combineReducers({
//   loginsignup: loginsignupReducer,
// });
// export default rootReducer = (state, action) => {
//   return appReducer(state, action);
// };
const rootReducer = combineReducers({
  loginsignup: loginsignupReducer,
  todo: TodoReducer,
});

export default rootReducer;
