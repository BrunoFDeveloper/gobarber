import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

import SelectProvider from './pages/New/SelectProvider/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime/SelectDateTime';
import Confirm from './pages/New/Confirm/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="Provider"
        options={({ navigation }) => ({
          title: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
        component={SelectProvider}
      />
      <Stack.Screen
        name="Date"
        options={({ navigation: { goBack } }) => ({
          title: 'Selecione um horário',
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
        component={SelectDateTime}
      />
      <Stack.Screen
        name="Confirm"
        options={({ navigation: { goBack } }) => ({
          title: 'Confirmar agendamento',
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
        component={Confirm}
      />
    </Stack.Navigator>
  );
};

const iconNames = {
  Dashboard: 'event',
  Profile: 'person',
  New: 'add-circle-outline',
};

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
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon name={iconNames[route.name]} size={size} color={color} />
              );
            },
          })}
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
            options={{ tabBarLabel: 'Agendamentos' }}
          />
          <Tab.Screen
            name="New"
            component={NewStack}
            options={{ tabBarLabel: 'Agendar', tabBarVisible: false }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{ tabBarLabel: 'Meu perfil' }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

Routes.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
