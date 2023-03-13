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
import { useDispatch } from "react-redux";
import { signupAction } from "../redux/actions/LoginActions";

const SignUp = ({ navigation }) => {
  const [errorText, setErrorText] = useState("");
  const Dispatch = useDispatch();
  const newUserEmail = {
    username: "priyanka",
    password: "123456",
    email: "priyanka@panchal.in",
  };

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const signupOnPress = async () => {
    if (!newUserEmail.username) return Alert.alert("Enter User Name");
    if (!newUserEmail.password) return Alert.alert("Enter Password");
    if (!newUserEmail.email) return Alert.alert("Enter Email");
    Dispatch(signupAction(newUserEmail));
  };

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
            onChangeText={(t) => (newUserEmail.username = t)}
            defaultValue={newUserEmail.username}
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
                onChangeText={(t) => (newUserEmail.email = t)}
                defaultValue={newUserEmail.email}
              />
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                ref={passwordInputRef}
                placeholder="Enter your Password here...!"
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
                onChangeText={(t) => (newUserEmail.password = t)}
                defaultValue={newUserEmail.password}
              />
              {errorText != "" ? (
                <Text style={styles.errorTextStyle}> {errorText} </Text>
              ) : null}
              <Pressable
                style={styles.btn}
                onPress={() => {
                  signupOnPress();
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
