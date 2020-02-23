import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
      {!signed ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Signin" component={SignIn} />
          <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#FFF',
            inactiveTintColor: 'rgba(255,255,255,0.6)',
            style: {
              backgroundColor: '#8d41a8',
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: 'Agendamentos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="event" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Meu perfil',
              tabBarIcon: ({ color, size }) => (
                <Icon name="person" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

Routes.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
