import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import DrawerCont from './DrawerCont';
import Colors from '../constants/Colors';
import BottomNav from '../navigation/BottomNav';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

const DrawerNav = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary},
        headerTintColor: 'white',
        headerTitleStyle: {left: 100},
      }}
      drawerContent={(props) => <DrawerCont {...props} />}>
      <Drawer.Screen
        name="Home"
        component={BottomNav}
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
