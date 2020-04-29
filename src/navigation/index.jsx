import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'
import { withFirebaseHOC } from 'kitty/utilities/Firebase'

function AppContainer(P) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthStateKnown, setIsAuthStateKnown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  P.firebase.auth().onAuthStateChanged((user) => {
    setIsAuthStateKnown(true);
    user ? setIsLoggedIn(true) : setIsLoggedIn(false); // Set user state (As Boolean)
  });

  const _cacheResourcesAsync = async () => {
    const cacheImages = (images) => {
      return images.map(image => {
        if (typeof image === 'string') {
          return Image.prefetch(image);
        } else {
          return Asset.fromModule(image).downloadAsync();
        }
      });
    }
    
    const cacheFonts = (fonts) => {
      return fonts.map(font => Font.loadAsync(font));
    }

    const imageAssets = cacheImages([
      require('kitty/assets/images/HandTap.jpg'),
      require('kitty/assets/images/Butterfly.jpg'),
      require('kitty/assets/images/StickBoi.jpg'),
      require('kitty/assets/images/Pin.png'),
    ]);

    const fontAssets = cacheFonts([
      // {'JosefinSans': require('Monch/assets/fonts/JosefinSans-VariableFont_wght.ttf')}
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  if (!isReady || !isAuthStateKnown) {
    return ( <AppLoading startAsync={_cacheResourcesAsync} onFinish={() => setIsReady(true)} onError={console.warn} /> ); 
  }

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Auth" >       
          {!isLoggedIn? <Stack.Screen name="Auth" component={AuthNavigation}/>: null }
          {isLoggedIn? <Stack.Screen name="App" component={AppNavigation}/>: null }     
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default withFirebaseHOC(AppContainer);