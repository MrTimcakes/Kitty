import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/Login'
import SignupScreen from '../screens/auth/Signup'
import ForgotPasswordScreen from '../screens/auth/ForgotPassword'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
    </Stack.Navigator>
  );
}

