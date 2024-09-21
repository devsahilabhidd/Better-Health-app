import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatScreen from '../screens/ChatScreen';
import GeminiChatBotScreen from '../forDelete/GeminiChatBotScreen';
import DemoChat from '../forDelete/DemoChat';
import GeminiChat1 from '../forDelete/GeminiChat1';
import RandomFoodFactScreen from '../screens/chatScreens/RandomFoodFactScreen';

const Stack = createNativeStackNavigator();
function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="GeminiChatBotScreen"
          component={GeminiChatBotScreen}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="DemoChat"
          component={DemoChat}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="GeminiChat1"
          component={GeminiChat1}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
        <Stack.Screen
          name="RandomFoodFactScreen"
          component={RandomFoodFactScreen}
          options={{animation: 'slide_from_right', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
