import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

//import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(user => {
    //   console.log('user', JSON.stringify(user));
    //   setUser(user);
    // });
    // return subscriber;
  }, []);

  // const logout = () => {
  //   Alert.alert(
  //     'Logout',
  //     'Are you sure? You want to logout?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           return null;
  //         },
  //       },
  //       {
  //         text: 'Confirm',
  //         onPress: () => {
  //           auth()
  //             .signOut()
  //             .then(() => navigation.replace('UserLogin'))
  //             .catch(error => {
  //               console.log(error);
  //               if (error.code === 'auth/no-current-user')
  //                 navigation.replace('UserLogin');
  //               else alert(error);
  //             });
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

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
            FIREBASE EMAIL LOGIN
          </Text>
          {user ? (
            <Text>
              Welcome {user.displayName ? user.displayName : user.email}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>Logout</Text>
          </TouchableOpacity>
          <Button
            title="Change Email"
            onPress={() =>
              navigation.navigate("ReAuthenticate", { work: "Email" })
            }
          />
          <Button
            title="Change Password"
            onPress={() =>
              navigation.navigate("ReAuthenticate", { work: "Password" })
            }
          />
          <Button
            title="Change Phone Number"
            onPress={() =>
              navigation.navigate("ReAuthenticate", { work: "Phonenumber" })
            }
          />
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
