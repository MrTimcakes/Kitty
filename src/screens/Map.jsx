import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  TextInput,
  Switch,
  Linking,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function Settings({firebase, navigation}){
  const [region, setRegion] = useState({
    "latitude": 53.22318884656845,
    "longitude": -0.5413862876594067,
    "latitudeDelta": 0.03610021964008325,
    "longitudeDelta": 0.03630001097917557,
  });

  const onRegionChange = (newRegion) => {
    // console.log(newRegion)
  }

  const _getPermission = async (permission) => {
    let { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      Linking.openURL('app-settings:');
      return false;
    }
    return true;
  }

  const _takePhoto = async () => {
    const status = await _getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
      if (!result.cancelled) {
        navigation.navigate("Add Post", { image: result });
      }
    }
  };

  useEffect(() => { return navigation.addListener("MultiFuncPress", MuliFuncAction); }, [navigation]); // Add listener for MultiFunction Button
  const MuliFuncAction = () => {
    if( !navigation.isFocused() ){return} // If not focused do nothing
    _takePhoto()
  }

  return (
    <SafeAreaView>
      
      <MapView 
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChange={onRegionChange}
        onPress={console.log}
        customMapStyle={require("kitty/constants/MapStyle.json")}
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}} 
      >
        <Marker
          image={require('kitty/assets/images/Pin.png')}
          coordinate={{
            "latitude": 53.22407916356557,
            "longitude": -0.5421264097094536,
          }}
        />
      </MapView>
      <View style={{ position: 'absolute', left: 0, top: 0, opacity: 0.0, height: Dimensions.get('window').height, width: 10, }}></View>{/* A View 10 wide to allow to swipe out drawer */}

    </SafeAreaView>
  );
}

export default withFirebaseHOC(Settings)