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


function Credits({firebase}){
  return (
    <SafeAreaView>
      
      <Text>Thank you to Mel Evatt for the astonishing cat illustrations</Text>
      <Text>Cat images taken from unspash</Text>

    </SafeAreaView>
  );
}

export default Credits;