import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function Signout({firebase}){
  useEffect(()=>{
    firebase.auth().signOut().then(function() {
      console.log("Cya")
    }).catch(function(error) {
      // An error happened.
    });
  },[])
  return(
    <View>
      <Text>Cya!</Text>
    </View>
  )
}

export default withFirebaseHOC(Signout);