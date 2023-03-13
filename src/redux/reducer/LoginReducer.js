const { LOG_IN_USER, SIGN_UP_USER } = require("../actions/Types");

const initialState = {
  newUserEmail: { username: "", password: "", email: "", phonenumber: "" },
};
const loginsignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return state;
    case SIGN_UP_USER:
      return state;
    default:
      return state;
  }
};
export default loginsignupReducer;
