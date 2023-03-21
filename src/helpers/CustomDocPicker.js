import { Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import DocumentPicker from "react-native-document-picker";
const CustomDocPicker = ({ onSelect }) => {
  const [fileResponse, setFileResponse] = useState([]);
  const handleDocumentSelection = useCallback(async () => {
    // try {
    const response = await DocumentPicker.pick({
      presentationStyle: "fullScreen",
    });
    console.log("RESPONSE ", response);
    setFileResponse(response);
    // } catch (err) {
    //   console.warn(err);
    // }
  }, []);
  return (
    <View>
      <Button title="Document" onPress={() => handleDocumentSelection()} />
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={{ color: "purple", fontSize: 15 }}
          numberOfLines={3}
          ellipsizeMode={"middle"}
        >
          {onSelect({ name: file?.name, uri: file?.uri })}
        </Text>
      ))}
    </View>
  );
};

export default CustomDocPicker;

const styles = StyleSheet.create({});
