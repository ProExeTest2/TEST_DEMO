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
//import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+918154097188");
  const [password, setPassword] = useState("abc@123");
  const [otp, setOtp] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // const loginOnPress = () => {
  //   if (!password) return Alert.alert('Enter Password', password);
  //   if (!email) return Alert.alert('Enter Email', email);

  //   auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(user => {
  //       console.log(user);
  //       if (user) navigation.replace('Home');
  //     })
  //     .catch(err => {
  //       Alert.alert(err.message);
  //     });
  // };
  // const LoginPhone = async () => {
  //   const conf = await auth().signInWithPhoneNumber(phone);
  //   setConfirm(conf);
  // };
  // const verifynum = async () => {
  //   try {
  //     await confirm.confirm(otp);
  //     Alert.alert('Verified!');
  //     //navigation.navigate('Home');
  //     auth()
  //       .currentUser.updateProfile({
  //         displayName: 'username',
  //       })
  //       .then(() => navigation.replace('Home'))
  //       .catch(err => {
  //         Alert.alert(err);
  //         console.log('ERROR ==> ', err);
  //       });
  //   } catch (error) {
  //     console.log('Invalid code.', error);
  //     Alert.alert('ERROR ', error);
  //   }
  // };
  // const phoneLoginOnPress = () => {
  //   if (!otp) return Alert.alert('Enter OTP', otp);
  //   if (!phone) return Alert.alert('Enter Phone', phone);

  //   auth()
  //     .signInWithPhoneNumber(phone, password)
  //     .then(user => {
  //       console.log(user);
  //       if (user) navigation.replace('Home');
  //     })
  //     .catch(err => {
  //       Alert.alert(err.message);
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <Text style={styles.title}>Login With Phone Number</Text>
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
                defaultValue={phone}
                placeholder="Enter your phone number here...!"
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
              <Button title="Get OTP" onPress={() => LoginPhone()} />
            </>
          )}
          {!isEnabled && (
            <>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email here...!"
                onChangeText={(t) => setEmail(t)}
              />
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                defaultValue={password}
                placeholder="Enter your Password here...!"
                onChangeText={(t) => setPassword(t)}
                secureTextEntry
              />
            </>
          )}

          <Pressable
            style={styles.btn}
            onPress={() => {
              isEnabled ? verifynum() : loginOnPress();
            }}
          >
            <Text style={styles.btnname}>LOGIN</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.btnname}>SignUp</Text>
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
