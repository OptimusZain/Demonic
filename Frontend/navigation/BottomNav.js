import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import Library from '../screens/Library';
import Settings from '../screens/Settings';
import Colors from '../constants/Colors';
import Icon from 'react-native-ionicons';
import Search from '../screens/Search';
import {useWindowDimensions} from 'react-native';

const BottomTab = createBottomTabNavigator();

const Navi = () => {
  const [height, setHeight] = useState(useWindowDimensions().height);
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: (focused, color, size) => {
          let iconName;

          if (route.name === 'Library') {
            iconName = 'headset';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Icon name={iconName} size={size} color="white" />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: Colors.dark,
        inactiveBackgroundColor: Colors.light,
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        style: {
          borderTopWidth: 0,
          // height: height > 800 ? 55 : 50,
        },
      }}>
      <BottomTab.Screen name="Library" component={Library} />
      <BottomTab.Screen name="Search" component={Search} />
    </BottomTab.Navigator>
  );
};

export default Navi;
