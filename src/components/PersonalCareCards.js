import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';

const PersonalCareCards = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY,
      }}>
      <Ionicons name="construct" size={moderateScale(100)} color={TERTIARY} />
      <Text style={{color: SECONDARY}}>This page is under construction</Text>
    </View>
  );
};

export default PersonalCareCards;

const styles = StyleSheet.create({});
