import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TopTabs from '../components/TopTabs';
import BetterHealthLogo from '../components/BetterHealthLogo';
import {ThemeContext} from '../context/ThemeContext';

const HomeScreen = () => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
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

