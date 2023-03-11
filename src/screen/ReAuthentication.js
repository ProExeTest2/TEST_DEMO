//Firebase-Email-Phone-Authentication
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
//import auth from '@react-native-firebase/auth';
const ReAuthenticate = ({ navigation, route }) => {
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("abc@123");
  const [newPassword, setNewPassword] = useState("abc@1234");
  const [oldPhoneNumber, setOldPhoneNumber] = useState("+918154097188");
  const [newPhoneNumber, setNewPhoneNumber] = useState("+919574672787"); //+919574672787
  const [otp, setOtp] = useState();
  const [confirm, setConfirm] = useState(null);

  // const changeAuthentication = () => {
  //   if (route.params.work === 'Email') {
  //     if (!oldEmail && !newEmail && !oldPassword)
  //       return Alert.alert('Enter Email');
  //     changeEmail(oldPassword, newEmail);
  //   } else if (route.params.work === 'Password') {
  //     if (!oldPassword && !newPassword) return Alert.alert('Enter Password');
  //     changePassword(oldPassword, newPassword);
  //   } else if (route.params.work === 'Phonenumber') {
  //     if (!oldPhoneNumber && !newPhoneNumber && !oldPassword)
  //       return Alert.alert('Enter All Details');
  //     //changePhonenumber(oldPassword, newPhoneNumber);
  //     verifynum();
  //     //signupPhone();
  //   } else {
  //     console.log(':::ERROR:::');
  //   }
  // };
  // const reauthenticate = currentPassword => {
  //   var user = auth().currentUser;
  //   var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
  //   return user.reauthenticateWithCredential(cred);
  // };
  // const changePassword = (currentPassword, newPassword) => {
  //   reauthenticate(currentPassword)
  //     .then(() => {
  //       var user = auth().currentUser;
  //       user
  //         .updatePassword(newPassword)
  //         .then(() => {
  //           console.log('Password updated!');
  //           Alert.alert('Password updated!');
  //         })
  //         .catch(error => {
  //           console.log('Password Auth update ', error);
  //         });
  //     })
  //     .catch(error => {
  //       console.log('Password Auth ', error);
  //     });
  // };
  // const changeEmail = (currentPassword, newEmail) => {
  //   reauthenticate(currentPassword)
  //     .then(() => {
  //       var user = auth().currentUser;
  //       user
  //         .updateEmail(newEmail)
  //         .then(() => {
  //           console.log('Email updated!');
  //           Alert.alert('Email updated!');
  //         })
  //         .catch(error => {
  //           console.log('Email Auth update ', error);
  //         });
  //     })
  //     .catch(error => {
  //       console.log('Email Auth ', error);
  //     });
  // };
  // const signupPhone = async () => {
  //   const conf = await auth().signInWithPhoneNumber(newPhoneNumber);
  //   setConfirm(conf);
  // };
  // const verifynum = async () => {
  //   try {
  //     await confirm.confirm(otp);
  //     Alert.alert('Verified!');
  //     //navigation.navigate('Home');
  //     auth()
  //       .currentUser.updateProfile({
  //         displayName: 'Priyanka',
  //       })
  //       .then(
  //         () => changePhonenumber(newPassword, newPhoneNumber),
  //         //navigation.replace('Home')
  //       )
  //       .catch(err => {
  //         Alert.alert(err);
  //         console.log('ERROR ==> ', err);
  //       });
  //   } catch (error) {
  //     console.log('Invalid code.', error);
  //     Alert.alert('ERROR ', error.message.toString());
  //   }
  // };
  // const changePhonenumber = (currentPassword, newPhoneNumber) => {
  //   reauthenticate(currentPassword)
  //     .then(() => {
  //       var user = auth().currentUser;
  //       user
  //         .updatePhoneNumber(newPhoneNumber)
  //         .then(() => {
  //           console.log('Phone Number updated!');
  //           Alert.alert('Phone Number updated!');
  //         })
  //         .catch(error => {
  //           console.log('Phonenumber Auth update ', error);
  //         });
  //     })
  //     .catch(error => {
  //       console.log('Phonenumber Auth ', error);
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
            {"Change " + route.params.work}
          </Text>
          {route.params.work === "Email" && (
            <>
              <Text style={styles.title}>Old Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your old email here...!"
                onChangeText={(t) => setOldEmail(t)}
              />
              <Text style={styles.title}>New Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your old email here...!"
                onChangeText={(t) => setNewEmail(t)}
              />
            </>
          )}
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.input}
            defaultValue={oldPassword}
            placeholder="Enter your current Password here...!"
            onChangeText={(t) => setOldPassword(t)}
            secureTextEntry
          />
          {route.params.work === "Password" && (
            <>
              <Text style={styles.title}>New Password</Text>
              <TextInput
                style={styles.input}
                defaultValue={newPassword}
                placeholder="Enter your new Password here...!"
                onChangeText={(t) => setNewPassword(t)}
                secureTextEntry
              />
            </>
          )}
          {route.params.work === "Phonenumber" && (
            <>
              <Text style={styles.title}>Old Phone Number</Text>
              <TextInput
                defaultValue={oldPhoneNumber}
                style={styles.input}
                placeholder="Enter your old email here...!"
                onChangeText={(t) => setOldPhoneNumber(t)}
              />
              <Text style={styles.title}>New Phone Number</Text>
              <TextInput
                style={styles.input}
                defaultValue={newPhoneNumber}
                placeholder="Enter your old email here...!"
                onChangeText={(t) => setNewPhoneNumber(t)}
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
              <Pressable
                style={styles.btn}
                onPress={() => {
                  signupPhone();
                }}
              >
                <Text style={styles.btnname}>{"Verify Phone Number"}</Text>
              </Pressable>
            </>
          )}
          <Pressable
            style={styles.btn}
            onPress={() => {
              changeAuthentication();
            }}
          >
            <Text style={styles.btnname}>{"Change " + route.params.work}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReAuthenticate;

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
