import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PRIMARY, TERTIARY} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';

const UnderWorking = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10),
        backgroundColor: PRIMARY,
      }}>
      <Ionicons name="construct" size={moderateScale(70)} color={TERTIARY} />
      <Text style={{color: TERTIARY}}>Under Construction</Text>
    </View>
  );
};

export default UnderWorking;

const styles = StyleSheet.create({});
