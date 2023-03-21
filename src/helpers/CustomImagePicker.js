import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid,
} from "react-native";
//import ImagePicker from "react-native-image-picker";

import storage from "@react-native-firebase/storage";

import { launchImageLibrary } from "react-native-image-picker";

const CustomImagePicker = ({ onSelect }) => {
  const [image, setImage] = useState(null);

  const [transferred, setTransferred] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  //const reference = storage().ref("MyImages");

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "External Storage Read Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };
  const selectImage = async () => {
    const options = {
      //   maxWidth: 2000,
      //   maxHeight: 2000,
      //   storageOptions: {
      //     skipBackup: true,
      //     path: "images",
      //   },
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          response.assets.map((item) => {
            console.log("&&&&&", item.uri);
            setImage(item.uri);
            onSelect(item.uri);
          });
        }
      });
    }
  };

  return (
    <View style={{}}>
      <Button title="Image" onPress={() => selectImage()} />
    </View>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({});
