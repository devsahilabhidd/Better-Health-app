import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LIGHT_GREEN, SECONDARY, TERTIARY} from '../constants/colors';
import {moderateScale} from 'react-native-size-matters';

const BetterHealthLogo = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: SECONDARY,
          fontSize: moderateScale(40),
        }}>
        Better
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: TERTIARY,
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
