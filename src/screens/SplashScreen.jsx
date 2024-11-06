import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
import BetterHealthLogo from '../components/BetterHealthLogo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];

  useEffect(() => {
    const functino = async () => {
      let userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        console.log('printing user info');
        console.log(userInfo);
        navigation.navigate('BottomTab');
      } else {
        console.log('printing user info');
        console.log(userInfo);
        navigation.navigate('Welcome');
      }
    };
    setTimeout(() => {
      functino();
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: activeColor.PRIMARY,
        gap: 20,
      }}>
      <BetterHealthLogo />
      <ActivityIndicator size="large" color={activeColor.TERTIARY} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
