import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
const { width } = Dimensions.get("screen");
const UserData = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    await database()
      .ref("users")
      .on("value", (tempData) => {
        setList([]);
        let temp = [];
        for (let x in tempData.val()) {
          temp.push(tempData.val()[x]);
        }
        setList(temp);
      });
  };

  const addUser = async () => {
    if ((username && email && age !== null) || undefined || "") {
      await database()
        .ref("/users/" + username)
        .set({
          name: username,
          age: age,
          email: email,
        })
        .then(() => {
          setName("");
          setEmail("");
          setAge("");
        })
        .catch((e) => console.log("Error ", e));
    } else {
      Alert.alert("Enter valid details..!");
    }
  };

  const deleteUser = async (value) => {
    await database()
      .ref("/users/" + value)
      .remove();
  };

  return (
    <View style={styles.container}>
      <Text>Firebase crud!</Text>
      <TextInput
        value={username}
        onChangeText={(username) => {
          setName(username);
        }}
        placeholder="Username"
        style={styles.textBoxes}
      ></TextInput>
      <TextInput
        value={email}
        onChangeText={(email) => {
          setEmail(email);
        }}
        placeholder="Email"
        style={[styles.textBoxes, { marginVertical: 10 }]}
      ></TextInput>
      <TextInput
        value={age}
        onChangeText={(age) => {
          setAge(age);
        }}
        placeholder="Age"
        style={styles.textBoxes}
        keyboardType="number-pad"
      ></TextInput>
      <Button
        onPress={() => addUser()}
        title="Submit"
        style={{ marginVertical: 10 }}
      />
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => {
          return (
            <View style={styles.card}>
              <View>
                <Text>Name: {item.item.name}</Text>
                <Text>Age: {item.item.age}</Text>
                <Text>Email: {item.item.email}</Text>
              </View>
              <Pressable onPress={() => deleteUser(item.item.name)}>
                <Image
                  source={require("../icons/trash.png")}
                  style={{ height: 30, width: 30 }}
                />
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "#0ff",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#0ff",
    width: width - 40,
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
