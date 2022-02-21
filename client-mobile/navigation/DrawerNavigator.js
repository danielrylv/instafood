import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import MainStackNavigation from './MainStackNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Highlights"
        component={MainStackNavigation}
        options={{ headerShown: false, swipeEnabled: false }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
