import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Linking, Image, TextInput, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

function SelectPhotoScreen({firebase, navigation, route}){
  const [image, setImage] = useState(route.params?.image ?? null);
  const [caption, setCaption] = useState(null);

  const _getPermission = async (permission) => {
    let { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      Linking.openURL('app-settings:');
      return false;
    }
    return true;
  }

  const _selectPhoto = async () => {
    const status = await _getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
      if (!result.cancelled) {
        setImage(result);
        // this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  const _takePhoto = async () => {
    const status = await _getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
      if (!result.cancelled) {
        setImage(result);
        // this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  const handleUpload = () =>{
    if(image && caption){
      firebase.post({desc: caption.trim(), image: image.uri})
      navigation.goBack();
    }else{
      alert('Need valid description!');
    }
  }
  // User has uploaded an image, ask to add a caption
  if(image){
    navigation.setOptions({ headerRight: () => ( <TouchableOpacity onPress={handleUpload}><Text style={{marginRight:10,fontSize:16}}>SHARE</Text></TouchableOpacity> ) })
    return(
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <Image
          source={{ uri: image.uri }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={setCaption}
        />
      </View>
    )
  }

  // No image has been selected, ask user what type they would like to upload
  return (
    <View style={styles.container}>
      <Text onPress={_selectPhoto} style={styles.text}>
        Select Photo
      </Text>
      <Text onPress={_takePhoto} style={styles.text}>
        Take Photo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default SelectPhotoScreen;