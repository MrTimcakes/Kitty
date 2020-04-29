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

import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function ListItem({image, name}){
  return (
    <View>
      <Text>
        {name}
      </Text>
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
        />
      </View>
    )
  }

  const CardView = () => {
    return (
      <View>

        <Text>Hey</Text>
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