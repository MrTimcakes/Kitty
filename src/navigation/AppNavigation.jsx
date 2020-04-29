import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import KittyTabBar from '../components/BottomTabBar';
import EmptyComponent from '../components/EmptyComponent';

import MapScreen from '../screens/Map';
import ProfileScreen from '../screens/Profile';
import AddPostScreen from '../screens/AddPost';
import SettingsScreen from '../screens/Settings';
import SignoutScreen from '../screens/auth/Signout';

const Tab = createBottomTabNavigator();
function TabContainer() {
  return (
    <Tab.Navigator tabBar={props => <KittyTabBar {...props}/>} >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="MULTIFUNC" component={EmptyComponent} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function App() {
  return (
    <Drawer.Navigator headerMode="none" initialRouteName="App" >
      <Drawer.Screen name="App" component={TabContainer}/>
      <Drawer.Screen name="Add Post" component={AddPostScreen}/>
      <Drawer.Screen name="Settings" component={SettingsScreen}/>
      <Drawer.Screen name="Sign Out" component={SignoutScreen}/>
    </Drawer.Navigator>
  );
}

export default App;