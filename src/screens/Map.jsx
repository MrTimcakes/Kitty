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
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import TimeAgo from 'javascript-time-ago';

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';

import Colors from 'kitty/constants/Colors';
import GPSIcon from 'kitty/assets/SVG/GPSIcon';

import SwipeablePanel from 'kitty/components/SwipeablePanel';
import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function Settings({firebase, navigation, route}){
  const [region, setRegion] = useState({ "latitude": 53.22318884656845, "longitude": -0.5413862876594067, "latitudeDelta": 0.03610021964008325, "longitudeDelta": 0.03630001097917557, });
  const profileID = route.params?.profileID ?? firebase.auth().currentUser.uid;
  const [kittyData, setKittyData] = useState(null); // All kitties
  const [panelOpen, setPanelOpen] = useState(false); // State of swipe up panel
  const [panelKitty, setPanelKitty] = useState(null); // Kitty in swipe up panel
  const [newPostLoc, setNewPostLoc] = useState(null);
  const [newPostMarker, setNewPostMarker] = useState(null);
  const timeAgo = new TimeAgo('en-US') // Initialise TimeAgo

  const closePanel = () => {
    setPanelOpen(false);
  };

  useEffect(() => {
    let uid = firebase.auth().currentUser.uid;
    var unsubscribe = firebase.firestore().collection("users").doc(uid).collection("posts")
    .onSnapshot(function(querySnapshot) {
      var newKittyData = [];
      querySnapshot.forEach(function(doc) {
        newKittyData.push(doc.data());
      });
      setKittyData( newKittyData );
    });

    return unsubscribe;
  }, []);

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  }
  const onRegionPress = (e) => {
    setNewPostLoc(e.nativeEvent.coordinate);
    if(newPostMarker){newPostMarker.showCallout();}
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
        navigation.navigate("Add Post", { image: result, location: {"latitude": region.latitude, "longitude": region.longitude} });
        // navigation.navigate("Add Post", { image: result });
      }
    }
  };

  const _LocateMe = async (permission) => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion( oldRegion => { return {...oldRegion, "latitude": location.coords.latitude, "longitude": location.coords.longitude, "latitudeDelta": 0.005, "longitudeDelta": 0.005} } )
    // console.log(location.coords.latitude)
  }

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
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onRegionPress}
        customMapStyle={require("kitty/constants/MapStyle.json")}
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}} 
      >

        {kittyData && kittyData.map(kitty => ( // Marker for each kitty
          <Marker
            key={kitty.postId}
            coordinate={kitty.location}
            image={require('kitty/assets/images/Pin.png')}
            onPress={(e)=>{
              setPanelKitty(kitty);
              setPanelOpen(true);
              setNewPostLoc(null);
            }}
          >
            <Callout>
              <View>
                <Text>
                  {kitty.name}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* {newPostLoc && // New post marker */}
          <Marker
            coordinate={newPostLoc ? newPostLoc : { "latitude": 0, "longitude": 0 }}
            image={require('kitty/assets/images/Pin.png')}
            ref={ref => {
              setNewPostMarker(ref);
            }}
            >
            <Callout onPress={()=>{setNewPostLoc(null);navigation.navigate("Add Post", { location: newPostLoc });}} >
              <View>
                <Text>
                  Add kitty
                </Text>
              </View>
            </Callout>
          </Marker>
        {/* } */}
      </MapView>
      <View style={{ position: 'absolute', left: 0, top: 0, opacity: 0.0, height: Dimensions.get('window').height, width: 10, }}></View>{/* A View 10 wide to allow to swipe out drawer */}
      <TouchableOpacity style={{backgroundColor:Colors.color4, position: 'absolute', right: 20, bottom: 100, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}} onPress={_LocateMe}>
        <GPSIcon width={30} height={30} />
      </TouchableOpacity>
      <SwipeablePanel fullWidth noBackgroundOpacity closeOnTouchOutside isActive={panelOpen} onClose={closePanel} >
        <View>
          { panelKitty ? (
            <View>
              <View style={{flexDirection: 'row', paddingLeft: 10}}>
                <Image style={{width: 100, height: 100, resizeMode: 'contain', aspectRatio: 1,}} source={{uri: panelKitty.image}} />
                <View style={{justifyContent: 'center'}}>
                  <Text style={{fontSize: 28}}> {panelKitty.name} </Text>
                  <Text style={{fontSize: 16, color: Colors.color3}}>Last Seen: {timeAgo.format(panelKitty.lastSeen)}</Text>
                </View>
              </View>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 16, color: Colors.color3}}>First Seen: {timeAgo.format(panelKitty.created)}</Text>
                <View style={{justifyContent:'center', alignItems: 'center', margin: 10}}>
                  <Image style={{width: '50%', resizeMode: 'contain', aspectRatio: 1,}} source={{uri: panelKitty.image}} />
                </View>
              </View>
            </View>
          ) : (
            <Text>
              Missing Kitty Data
            </Text>
          )}
        </View>
      </SwipeablePanel>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(Settings)