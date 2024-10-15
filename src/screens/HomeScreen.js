import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';

import TopTabs from '../components/TopTabs';
import BetterHealthLogo from '../components/BetterHealthLogo';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import LoadingModel from '../components/LoadingModel';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  const [showModelLoading, setShowModelLoading] = useState(false);

  // Below state and functions are for back handeling
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    // THIS FUNCTION IS TO PRESS BACK TWO TIMES TO EXIT THE APP
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show('Tap back once more to exit', 1000);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }),
  );

  return (
    <View
      style={{
        // borderWidth: 1,
        flex: 1,
        backgroundColor: activeColor.PRIMARY,
      }}>


      {/* LOGO */}
      <View
        style={{
          // borderWidth: 2,
          // borderColor: 'white',
          flexDirection: 'row', // Align horizontally
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: moderateScale(10),
        }}>
        <BetterHealthLogo />
      </View>

      {/* <FoodCards /> */}
      <TopTabs />
    </View>
  );
};

export default HomeScreen;
