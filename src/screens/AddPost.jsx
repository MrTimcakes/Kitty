import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Linking, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';

import TitlePath from 'kitty/assets/SVG/TitlePath';

import Colors from 'kitty/constants/Colors';
import GPSIcon from 'kitty/assets/SVG/GPSIcon';

import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function SelectPhotoScreen({firebase, navigation, route}){
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [location, setlocation] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => { // On Focus set state to params
      if(route.params.image){setImage(route.params.image)}
      if(route.params.location){setlocation(route.params.location)}
    });

    return unsubscribe;
  }, [navigation]);

  const GoBack = () => {
    setImage(null);
    setName(null);
    setlocation(null);
    navigation.goBack();
  }

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

  const _LocateMe = async (permission) => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setlocation( oldRegion => { return {...oldRegion, latitude: location.coords.latitude, longitude: location.coords.longitude} } )
  }

  const handleUpload = () =>{
    if(image && name){
      setSubmitting(true);
      firebase.post({name: name.trim(), image: image.uri, location: location})
      .then(e => {
        setSubmitting(false);
        GoBack();
      });
    }else{
      alert('Need valid Name!');
    }
  }
  // User has uploaded an image, ask to add a caption
  if(image){
    navigation.setOptions({ headerRight: () => ( <TouchableOpacity onPress={handleUpload}><Text style={{marginRight:10,fontSize:16}}>SHARE</Text></TouchableOpacity> ) })
    return(
      <View style={{backgroundColor: '#444', flex:1}}>
        <View style={{alignItems: 'center', justifyContent: 'flex-end', height: 220}}>
          <TitlePath width='70%' />
        </View>

        <View style={{ padding: 10}} >
          <View style={{ padding: 10, flexDirection: 'row' }}>
            <Image
              source={{ uri: image.uri }}
              style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
            />
            <TextInput
              multiline
              style={{ flex: 1, paddingHorizontal: 16, color: '#fff' }}
              placeholder="Add a name..."
              onChangeText={setName}
            />
          </View>
          <TextInput
            placeholder="Latitude..."
            value={location?.latitude.toString()}
            onChangeText={newLat=>{ setlocation(prevState => { return {...prevState, latitude: Number(newLat) }; }) }}
          />
          <TextInput
            placeholder="Longitude..."
            value={location?.longitude.toString()}
            onChangeText={newLong=>{ setlocation(prevState => { return {...prevState, longitude: Number(newLong) }; }) }}
          />
            
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {submitting ? (
            <ActivityIndicator />
          ) : (
          <TouchableOpacity onPress={handleUpload} style={{backgroundColor: Colors.color4, width: '90%', height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 28}}>Upload!</Text>
          </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={{backgroundColor:Colors.color4, position: 'absolute', right: 20, bottom: 20, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}} onPress={_LocateMe}>
          <GPSIcon width={30} height={30} />
        </TouchableOpacity>
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

export default withFirebaseHOC(SelectPhotoScreen);