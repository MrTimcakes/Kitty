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

import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function Settings({firebase, navigation}){

  useEffect(() => { return navigation.addListener("MultiFuncPress", MuliFuncAction); }, [navigation]); // Add listener for MultiFunction Button
  const MuliFuncAction = () => {
    if( !navigation.isFocused() ){return} // If not focused do nothing
    navigation.navigate("Add Post");
  }

  return (
    <SafeAreaView>
      
      <Text>Kitty Profile</Text>

    </SafeAreaView>
  );
}

export default withFirebaseHOC(Settings)