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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TimeAgo from 'javascript-time-ago';

import Colors from 'kitty/constants/Colors';
import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function ListItem({image, name, lastSeen, created}){
  const timeAgo = new TimeAgo('en-US') // Initialise TimeAgo
  return (
    <View style={{flexDirection: 'row', margin: 5}}>
      <Image style={{width: 75, resizeMode: 'contain', aspectRatio: 1,}} source={{uri: image}} />
      <View style={{justifyContent: 'center'}}>
        <Text style={{color: Colors.color4, fontSize: 22}}>{name}</Text>
        <Text style={{color: Colors.color3, fontSize: 14}}>First Seen: {timeAgo.format(created)}</Text>
        <Text style={{color: Colors.color3, fontSize: 14}}>Last Seen: {timeAgo.format(lastSeen)}</Text>
      </View>
    </View>
  )
}

function CardItem({image, name, lastSeen, created}){
  const timeAgo = new TimeAgo('en-US') // Initialise TimeAgo
  return (
    <View style={{flexDirection: 'column', margin: 5}}>
      <Image style={{width: '100%', resizeMode: 'contain', aspectRatio: 1,}} source={{uri: image}} />
      <View style={{justifyContent: 'center'}}>
        <Text style={{color: Colors.color4, fontSize: 22}}>{name}</Text>
        <Text style={{color: Colors.color3, fontSize: 14}}>First Seen: {timeAgo.format(created)}</Text>
        <Text style={{color: Colors.color3, fontSize: 14}}>Last Seen: {timeAgo.format(lastSeen)}</Text>
      </View>
    </View>
  )
}

function Settings({firebase, navigation}){
  const Tab = createMaterialTopTabNavigator();
  const [kittyData, setKittyData] = useState(null);

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

  useEffect(() => { return navigation.addListener("MultiFuncPress", MuliFuncAction); }, [navigation]); // Add listener for MultiFunction Button
  const MuliFuncAction = () => {
    if( !navigation.isFocused() ){return} // If not focused do nothing
    navigation.navigate("Add Post");
  }

  const ListView = () => {
    return (
      <View>
        {/* <Text>{JSON.stringify(kittyData)}</Text> */}
        <FlatList
          data={kittyData}
          renderItem={({ item }) => <ListItem key={item.postId} {...item} />}
          keyExtractor={item => item.postId}
          ListFooterComponent={ListFooter}
        />
      </View>
    )
  }

  const CardView = () => {
    return (
      <View>
        <FlatList
          data={kittyData}
          renderItem={({ item }) => <CardItem key={item.postId} {...item} />}
          keyExtractor={item => item.postId}
          ListFooterComponent={ListFooter}
        />
      </View>
    )
  }

  const ListFooter = () =>{
    return (
      <View style={{height:120}}>

      </View>
    )
  }

  return (
    <SafeAreaView style={{backgroundColor:'#333', flex: 1}}>
      
      {/* <Text>Kitty Profile</Text> */}
      <Tab.Navigator>
        <Tab.Screen name="List" component={ListView} />
        <Tab.Screen name="Card" component={CardView} />
      </Tab.Navigator>

    </SafeAreaView>
  );
}

export default withFirebaseHOC(Settings)