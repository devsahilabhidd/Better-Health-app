import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import { COLORS } from '../constants/colors';

const ScannerScreen = () => {
  const {theme} = useContext(ThemeContext);
  const activeColor = COLORS[theme];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: activeColor.PRIMARY,
      }}>
      <Text style={{color: activeColor.TERTIARY}}>ScannerScreen</Text>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({});
