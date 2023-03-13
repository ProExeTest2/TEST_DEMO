import { LOG_IN_USER, SIGN_UP_USER } from "./Types";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
export const loginAction = (user) => async (dispatch) => {
  Alert.alert("NEW USER:=> ", user);
  dispatch({ type: LOG_IN_USER, payload: user });
};

export const signupAction = (user) => async (dispatch) => {
  Alert.alert("NEW USER:=> ", JSON.stringify(user));
  console.log("NEW USER:=> ", user.email, user.password);
  auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(() => {
      console.log("usercreated");
      Alert.alert("usercreated");
    })
    .catch((e) => {
      console.log("ERROR SIGNUPs ==> ", e);
      if (e.code === "auth/email-already-in-use") {
        console.log("Email is Already in Use.!");
      } else {
        console.log(e.message);
      }
    });
  dispatch({ type: SIGN_UP_USER, payload: user });
}; //project-126485160983
