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
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { createRef, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const Login = ({ navigation }) => {
  GoogleSignin.configure({
    webClientId:
      "552333683334-0sa3ovvokka30qijv0mgcqig36jlg8vu.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

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
            {"FIREBASE SOCIAL LOGIN"}
          </Text>
          <Pressable
            style={styles.btn}
            onPress={() => {
              console.log("HELLO");
              onGoogleButtonPress().then(() => {
                console.log("Signed in with Google!");
                navigation.replace("Home");
              });
            }}
          >
            <Text style={styles.btnname}>GOOGLE</Text>
          </Pressable>

          <Pressable
            style={styles.btn}
            onPress={() => {
              console.log("HELLO");
              onGoogleButtonPress().then(() => {
                console.log("Signed in with Google!");
                navigation.replace("Home");
              });
            }}
          >
            <Text style={styles.btnname}>FACEBOOK</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
