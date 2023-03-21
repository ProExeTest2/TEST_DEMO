import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";

import auth from "@react-native-firebase/auth";
const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(async () => {
    console.log("SPLASH", auth().currentUser);
    setTimeout(() => {
      setAnimating(false);
      navigation.replace(auth().currentUser ? "Home" : "Login");
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#307ecc" }}>
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 30, fontWeight: "bold" }}>
          FIREBASE EMAIL LOGIN
        </Text>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "white",
        }}
      >
        React Native Firebase Authentication
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
