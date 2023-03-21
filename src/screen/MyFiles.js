import {
  Alert,
  Button,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomImagePicker from "../helpers/CustomImagePicker";
import storage from "@react-native-firebase/storage";
import CustomDocPicker from "../helpers/CustomDocPicker";
import * as Progress from "react-native-progress";
const MyFiles = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileuri, setFileUri] = useState(null);
  const [filename, setFileName] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  useEffect(() => {
    getImages("");
    getFiles("");
  }, [file, gallery]);
  const onImageSelect = (value) => {
    setImage(value);
  };
  const onFileSelect = (value) => {
    console.log("VALUES ", value);
    setSelectedFile(value);
    setFileUri(value.uri);
    setFileName(value.name);
  };
  const getImages = async () => {
    const imageRefs = await storage().ref().child("MyImages/").listAll();
    const urls = await Promise.all(
      imageRefs.items.map((ref) => ref.getDownloadURL())
    );
    setGallery(urls);
  };
  const getFiles = async () => {
    const FileRefs = await storage().ref().child("MyFiles/").listAll();
    const urls = await Promise.all(
      FileRefs.items.map((ref) => ref.getDownloadURL())
    );
    setFile(urls);
  };
  const uploadImage = async () => {
    const uri = image;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    setUploadingImg(true);
    const task = storage().ref(`/MyImages/${filename}`).putFile(uploadUri);
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error("image upload error:", e);
    }
    setUploadingImg(false);
    Alert.alert(
      "Photo uploaded!",
      "Your photo has been uploaded to Firebase Cloud Storage!"
    );
    setImage(null);
  };

  const uploadFile = async () => {
    const uri = fileuri;
    const uploadUri =
      Platform.OS === "ios" ? fileuri.replace("file://", "") : uri;
    setUploadingDoc(true);
    const task = storage().ref(`/MyFiles/${filename}`).putFile(uploadUri);
    // set progress state
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error("File upload error:", e);
    }
    setUploadingDoc(false);
    Alert.alert(
      "File uploaded!",
      "Your File has been uploaded to Firebase Cloud Storage!"
    );
    setSelectedFile(null);
  };
  const deleteFile = (fileName, type) => {
    console.log(fileName, type);
    let fileRef = storage().ref(type + fileName);
    Alert.alert("Delete", "Do you want tot delete this?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          fileRef
            .delete()
            .then(() => {
              console.log("File Deleted");
            })
            .catch((e) => console.log("File not deleted", e));
        },
      },
    ]);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={styles.container}>
        <CustomImagePicker onSelect={onImageSelect} />

        <CustomDocPicker onSelect={onFileSelect} />
      </View>

      {image !== null ? (
        <Image source={{ uri: image }} style={{ height: 100, width: 100 }} />
      ) : null}
      {selectedFile !== null ? (
        <Image
          source={require("../icons/upload.png")}
          style={{ height: 100, width: 100 }}
        />
      ) : null}
      <View style={styles.container}>
        {uploadingImg ? (
          <View style={{ marginTop: 20 }}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <Button
            style={styles.uploadbtn}
            title="Upload image"
            onPress={() => uploadImage()}
          />
        )}
        {uploadingDoc ? (
          <View style={{ marginTop: 20 }}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <Button
            style={styles.uploadbtn}
            title="Upload Doc"
            onPress={() => uploadFile()}
          />
        )}
      </View>

      <FlatList
        style={styles.list}
        data={gallery}
        renderItem={({ item }) => (
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onLongPress={() =>
              deleteFile(
                item.substring(item.indexOf("%2F") + 3, item.indexOf("?")),
                "/MyImages/"
              )
            }
          >
            <Image
              source={{ uri: item }}
              style={{ height: 50, width: 50, margin: 10 }}
            />
            <Text style={styles.filename}>
              {item.substring(item.indexOf("%2F") + 3, item.indexOf("?"))}
            </Text>
          </Pressable>
        )}
      />
      <FlatList
        style={styles.list}
        data={file}
        renderItem={({ item, index }) => (
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onLongPress={() =>
              deleteFile(
                item
                  .substring(item.indexOf("%2F") + 3, item.indexOf("?"))
                  .replace(/%20/g, " "),
                "/MyFiles/"
              )
            }
          >
            <Text style={styles.filename}>
              {"(" + (index + 1) + ") "}
              {item
                .substring(item.indexOf("%2F") + 3, item.indexOf("?"))
                .replace(/%20/g, " ")}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default MyFiles;

const styles = StyleSheet.create({
  list: {
    borderColor: "red",
    borderWidth: 2,
    padding: 5,
    backgroundColor: "grey",
    marginTop: 10,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "red",
  },
  filename: { fontSize: 15, marginVertical: 5 },
  uploadbtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
