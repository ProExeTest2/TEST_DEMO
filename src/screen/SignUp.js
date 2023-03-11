import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { createRef, useState } from "react";
//import auth from "@react-native-firebase/auth";

const SignUp = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("abc@123");
  const [errorText, setErrorText] = useState("");

  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [confirm, setConfirm] = useState(null);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // const signupPhone = async () => {
  //   const conf = await auth().signInWithPhoneNumber(phone);
  //   setConfirm(conf);
  // };
  // const verifynum = async () => {
  //   try {
  //     await confirm.confirm(otp);
  //     Alert.alert("Verified!");
  //     navigation.navigate("Home");
  //     auth()
  //       .currentUser.updateProfile({
  //         displayName: username,
  //       })
  //       .then(() => navigation.replace("Home"))
  //       .catch((err) => {
  //         Alert.alert(err);
  //         console.log("ERROR ==> ", err);
  //       });
  //   } catch (error) {
  //     console.log("Invalid code.", error);
  //     Alert.alert("ERROR ", error);
  //   }
  // };

  // const signUpOnpress = async () => {
  //   if (!username) return Alert.alert("Enter User Name", username);
  //   if (!password) return Alert.alert("Enter Password", password);
  //   if (!email) return Alert.alert("Enter Email", email);

  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log("Registration Success...!");
  //       console.log(user);
  //       if (user) {
  //         auth()
  //           .currentUser.updateProfile({
  //             displayName: username,
  //             photoURL: require("../icons/clock.png"),
  //           })
  //           .then(() => navigation.replace("Home"))
  //           .catch((err) => {
  //             Alert.alert(err);
  //             console.log("ERROR ==> ", err);
  //           });
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("ERROR SIGNUP ==> ", e);
  //       if (e.code === "auth/email-already-in-use") {
  //         setErrorText("Email is Already in Use.!");
  //       } else {
  //         setErrorText(e.message);
  //       }
  //     });
  // };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <KeyboardAvoidingView enabled>
        <View style={styles.container}>
          <Text
            style={{
              color: "red",
              fontSize: 30,
              fontWeight: "bold",
              marginVertical: 20,
            }}
          >
            FIREBASE EMAIL LOGIN
          </Text>
          <Text style={styles.title}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Name here...!"
            returnKeyType="next"
            onSubmitEditing={() =>
              emailInputRef.current && emailInputRef.current.focus()
            }
            blurOnSubmit={false}
            onChangeText={(t) => setUserName(t)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <Text style={styles.title}>SignUp With Phone Number</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {isEnabled && (
            <>
              <Text style={styles.title}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Phone Number here...!"
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="phone-pad"
                onChangeText={(t) => setPhone(t)}
              />
              <Text style={styles.title}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                onChangeText={(t) => setOtp(t)}
                keyboardType="number-pad"
              />
              <Button title="Get Otp" onPress={() => signupPhone()} />

              <Pressable
                style={styles.btn}
                onPress={() => {
                  verifynum();
                }}
              >
                <Text style={styles.btnname}>Verify Phone</Text>
              </Pressable>
            </>
          )}
          {!isEnabled && (
            <>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.input}
                ref={emailInputRef}
                placeholder="Enter your email here...!"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
                onChangeText={(t) => setEmail(t)}
              />
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                ref={passwordInputRef}
                placeholder="Enter your Password here...!"
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
                onChangeText={(t) => setPassword(t)}
                defaultValue={password}
              />
              {errorText != "" ? (
                <Text style={styles.errorTextStyle}> {errorText} </Text>
              ) : null}
              <Pressable
                style={styles.btn}
                onPress={() => {
                  signUpOnpress();
                }}
              >
                <Text style={styles.btnname}>LOGIN</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "purple",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    height: 30,
    borderColor: "purple",
    borderWidth: 1,
    padding: 5,
  },
  btn: {
    backgroundColor: "purple",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  btnname: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
