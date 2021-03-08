import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import DrawerNav from '../navigation/DrawerNav';
import Colors from '../constants/Colors';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

function Navigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerTitleStyle: {left: 100},
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="MainMenu"
          component={DrawerNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
