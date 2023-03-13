import { combineReducers } from "redux";
import loginsignupReducer from "./LoginReducer";

// const appReducer = combineReducers({
//   loginsignup: loginsignupReducer,
// });
// export default rootReducer = (state, action) => {
//   return appReducer(state, action);
// };
const rootReducer = combineReducers({
  loginsignup: loginsignupReducer,
});

export default rootReducer;
