import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {COLORS} from '../constants/colors';
import {moderateScale} from 'react-native-size-matters';
import {ThemeContext} from '../context/ThemeContext';

const BetterHealthLogo = () => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: activeColor.SECONDARY,
          fontSize: moderateScale(40),
        }}>
        Better
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: activeColor.TERTIARY,
          fontSize: moderateScale(40),
        }}>
        {' '}
        Health
      </Text>
    </View>
  );
};

export default BetterHealthLogo;

const styles = StyleSheet.create({});
