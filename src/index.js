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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import ScannerScreen from './screens/ScannerScreen';
import {View} from 'react-native';
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
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: moderateScale(12),
            color: activeColor.SECONDARY,
            marginBottom: moderateScale(3),
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={focused ? moderateScale(16) : moderateScale(16)}
              color={activeColor.SECONDARY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          headerShown: false,
          headerTitle: 'Blog App',
          tabBarLabel: () => {},
          tabBarIcon: ({focused}) => (
            <View
              style={{
                width: 100,
                height: 100,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderTopWidth: 1,
                  borderLeftWidth: 0.3,
                  borderRightWidth: 0.3,
                  borderColor: focused
                    ? activeColor.TERTIARY
                    : activeColor.SECONDARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  backgroundColor: activeColor.PRIMARY,
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: activeColor.TERTIARY,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name={'document-scanner'}
                    size={focused ? moderateScale(25) : moderateScale(20)}
                    color={activeColor.PRIMARY}
                  />
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: moderateScale(12),
            color: activeColor.SECONDARY,
            marginBottom: moderateScale(3),
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) => (
            <FontAwesome
              // name={'user'}
              name={focused ? 'user' : 'user-o'}
              size={focused ? moderateScale(16) : moderateScale(16)}
              color={activeColor.SECONDARY}
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
