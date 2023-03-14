import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const Home = ({ navigation }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log("CURRENT ", currentUser);
    setUser(currentUser);
  };
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: async () => {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            setUser([]);
            // try {
            //   await GoogleSignin.revokeAccess();
            //   await GoogleSignin.signOut();

            //   setUser([]);
            // } catch (error) {
            //   console.error(error);
            // }
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 30,
              fontWeight: "bold",
              marginVertical: 20,
            }}
          >
            FIREBASE SOCIAL LOGIN
          </Text>
          <Text>
            Welcome {"\nEmail: "} {user?.user?.email}
            {"\nName: "} {user?.user?.name}
          </Text>
          <Image
            style={{ height: 30, width: 30 }}
            source={{ uri: user?.user?.photo }}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});
