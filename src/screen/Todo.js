import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
const Todo = ({ navigation }) => {
  const [tdata, setTdata] = useState([]);
  const TodoCollection = firestore().collection("Todo");

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    const getData = TodoCollection.onSnapshot((snap) => {
      const temp = [];
      snap.forEach((doc) => {
        temp.push({ ...doc.data() });
        console.log("doc data ", doc.data());
      });
      setTdata(temp);
    });
    return () => getData();
  };

  const deleteTodo = (title) => {
    TodoCollection.doc(title)
      .delete()
      .then((doc) => {
        console.log("Document successfully deleted!", doc.data());
      })
      .catch((er) => console.log("error in delete ", er));
    getTodo();
  };
  const isCompleteTodo = (ids, title) => {
    const dt = tdata.find((item) => item.title === title);
    dt.completed = !dt.completed;
    TodoCollection.doc(title).set(dt);
  };
  const showCompletedOnPress = () => {
    TodoCollection.where("completed", "==", true)
      .get()
      .then((snap) => {
        const temp = [];
        snap.forEach((doc) => {
          temp.push({ ...doc.data() });
          console.log(doc.data());
        });
        setTdata(temp);
        console.log("TEMP ", temp);
      })
      .catch((er) => {
        console.warn("COMPLETED DATA ERROR ", er);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.addbtn}>Todo</Text>
      <Pressable
        style={{
          backgroundColor: "yellow",
          borderRadius: 20,
          padding: 5,
          alignItems: "center",
        }}
        onPress={() => {
          console.log("Pressed Clear.!");
          showCompletedOnPress();
        }}
      >
        <Text style={styles.addbtn}>Show Completed</Text>
      </Pressable>
      <FlatList
        data={tdata}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          console.log("TDATA ", item);
          return (
            <View
              style={[
                styles.addtodocontainer,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <View>
                <Text style={styles.addbtn}>{item.title}</Text>
                <Text style={{ fontSize: 15 }}>{item.description}</Text>
              </View>
              <View>
                <Pressable
                  hitSlop={1}
                  onPress={() => {
                    isCompleteTodo(item.index, item.title);
                    console.log("Pressed complete.!", item.id);
                  }}
                >
                  <Image
                    style={styles.dlticon}
                    source={
                      item.completed
                        ? require("../icons/complited.png")
                        : require("../icons/notcomplited.png")
                    }
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    deleteTodo(item.title);
                    console.log("Pressed delete.!", index);
                  }}
                >
                  <Image
                    style={styles.dlticon}
                    source={require("../icons/trash.png")}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    //updateTodo(index);
                    navigation.navigate("AddTodo", {
                      work: "Update Todo",
                      title: item.title,
                      id: item.id,
                      description: item.description,
                    });
                    console.log("Pressed delete.!", index);
                  }}
                >
                  <Image
                    style={styles.dlticon}
                    source={require("../icons/edit.png")}
                  />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={[styles.addtodocontainer, { alignItems: "center" }]}
        onPress={() => {
          //Alert.alert(JSON.stringify(tdata));
          navigation.navigate("AddTodo", { work: "Add Todo" });
        }}
      >
        <Text style={styles.addbtn}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  numcontainer: {
    backgroundColor: "#FFC0CB",
    height: 50,
    padding: 15,
    borderRadius: 25,
    justifyContent: "center",
    margin: 5,
  },
  addtodocontainer: {
    backgroundColor: "#FFC0CB",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  addbtn: {
    color: "purple",
    fontSize: 20,
    fontWeight: "700",
  },
  dlticon: {
    height: 24,
    width: 24,
    margin: 5,
  },
});
