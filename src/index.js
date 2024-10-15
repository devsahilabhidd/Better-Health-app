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
import {AuthContext} from './context/AuthContext';
import SplashScreen from './screens/SplashScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function BottomTab() {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: activeColor.TERTIARY,
        tabBarInactiveTintColor: activeColor.SECONDARY,
        tabBarStyle: {
          backgroundColor: activeColor.PRIMARY,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitle: 'Blog App',
          tabBarLabel: () => {},
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={focused ? moderateScale(30) : moderateScale(25)}
              color={focused ? activeColor.TERTIARY : activeColor.SECONDARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: () => {},
          tabBarIcon: ({focused}) => (
            <FontAwesome
              // name={'user'}
              name={focused ? 'user' : 'user-o'}
              size={focused ? moderateScale(30) : moderateScale(25)}
              color={focused ? activeColor.TERTIARY : activeColor.SECONDARY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const {userInfo} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {userInfo === '' ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                animation: 'slide_from_right',
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{
                headerShown: false,
                animation: 'slide_from_right',
                // backgroundColor: 'red',
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
