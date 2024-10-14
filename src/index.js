import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ChatScreen from './screens/ChatScreen';
import RandomFoodFactScreen from './screens/chatScreens/RandomFoodFactScreen';
import HealthDisease from './screens/chatScreens/HealthDisease';
import ReadFoodLabel from './screens/chatScreens/ReadFoodLabel';
import UnderWorking from './screens/UnderWorking';
import {COLORS, PRIMARY, SECONDARY, TERTIARY} from './constants/colors';
import ReadPersonalCareLabel from './screens/chatScreens/ReadPersonalCareLabel';
import LoginScreen from './screens/auth/LoginScreen';
import {ThemeContext} from './context/ThemeContext';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="ReadFoodLabel"
          component={ReadFoodLabel}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="ReadPersonalCareLabel"
          component={ReadPersonalCareLabel}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="RandomFoodFactScreen"
          component={RandomFoodFactScreen}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="HealthDisease"
          component={HealthDisease}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UnderWorking"
          component={UnderWorking}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTintColor: activeColor.SECONDARY,
            headerStyle: {
              backgroundColor: activeColor.PRIMARY,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
