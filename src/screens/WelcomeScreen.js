import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../context/AppContext';
import {ThemeContext} from '../context/ThemeContext';
const WelcomeScreen = () => {
  // const theme = useColorScheme();
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  console.log(theme);

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: activeColor.PRIMARY,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          padding: moderateScale(10),
        }}></View>
      <View
        style={{
          padding: moderateScale(10),
          justifyContent: 'center',
          alignItems: 'center',
          gap: verticalScale(150),
        }}>
        <View style={{gap: verticalScale(10)}}>
          <Text
            style={{
              textAlign: 'center',
              color: activeColor.SECONDARY,
              fontWeight: '900',
              fontSize: moderateScale(40),
            }}>
            Welcome to{' '}
            <Text style={{color: activeColor.TERTIARY}}>Better Health</Text>{' '}
            Your Personalized Health Assistant
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: activeColor.SECONDARY,
              fontWeight: '400',
              fontSize: moderateScale(15),
            }}>
            Empower your health journey with smarter choices.
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate('LoginScreen')}
          style={({pressed}) => [
            {
              backgroundColor: pressed
                ? activeColor.LIGHT_GREEN
                : activeColor.TERTIARY,
            },
            {
              padding: moderateScale(5),
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(20),
            },
          ]}>
          <Text
            className="text-primary font-bold"
            style={{
              color: activeColor.LIGHT,
              fontSize: moderateScale(20),
              fontWeight: '500',
            }}>
            Next
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
