import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodoAction, updatetodoAction } from "../redux/actions/TodoActions";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const AddTodo = ({ route, navigation }) => {
  const Dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  const { work, title, id, description } = route.params;
  console.log("---->data ", todo);
  const currentUser = auth().currentUser;
  const [newtodo, setNewTodo] = useState({
    id: id || "",
    title: title || "",
    description: description || "",
    completed: false,
    username: currentUser.displayName || "",
    email: currentUser.email || "",
  });
  const TodoCollection = firestore().collection("Todo");
  const Add_Update_Todo_onPress = () => {
    if (
      (newtodo.title &&
        newtodo.description &&
        newtodo.username &&
        newtodo.email != null) ||
      ""
    ) {
      if (work == "Add Todo") {
        console.log("LENGTH---> ", todo);
        newtodo.id = todo.todoList.length;
        TodoCollection.doc(newtodo.title).set(newtodo);
        Alert.alert("TODO is added to the list..." + JSON.stringify(newtodo));
      } else if (work == "Update Todo") {
        TodoCollection.doc(newtodo.title).set(newtodo);
      } else {
        Alert.alert("Not Acceptable command...!");
      }
      console.log("ADD TODO--->", todo);
      navigation.goBack();
    } else {
      Alert.alert("Fill the Data", JSON.stringify(newtodo));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.lable}>Todo Title</Text>
      <TextInput
        defaultValue={newtodo.title}
        style={styles.titlecontainer}
        maxLength={25}
        onChangeText={(text) => {
          newtodo.title = text;
        }}
      />
      <Text style={styles.lable}>Todo Description</Text>
      <TextInput
        defaultValue={newtodo.description}
        style={styles.descriptioncontainer}
        multiline
        numberOfLines={6}
        maxLength={150}
        onChangeText={(text) => {
          newtodo.description = text;
        }}
      />
      <TouchableOpacity
        style={styles.addtodocontainer}
        onPress={() => {
          Add_Update_Todo_onPress();
        }}
      >
        <Text style={styles.btnlable}>{route.params.work}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    padding: 15,
  },
  lable: {
    color: "#FFC0CB",
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 10,
  },
  titlecontainer: {
    backgroundColor: "#FFC0CB",
    width: "100%",
    padding: 15,
    borderRadius: 15,
  },
  descriptioncontainer: {
    backgroundColor: "#FFC0CB",
    width: "100%",
    height: 100,
    borderRadius: 15,
    padding: 20,
  },
  addtodocontainer: {
    backgroundColor: "#FFC0CB",
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  btnlable: {
    color: "purple",
    fontSize: 20,
    fontWeight: "700",
  },
});
