// const light = false;
export let THEME_COLOR = false;
const light = THEME_COLOR;
export const DARK = '#000000';
export const LIGHT = '#ffffff';

export const LIGHT_GREEN = '#00e68a';

export const PRIMARY = light ? LIGHT : DARK;
export const SECONDARY = light ? DARK : LIGHT;

export const BACKGROUND_COLOR = light ? '#e6ffe6' : '#14141f';

export const TERTIARY = '#38A169'; // green-700

export const COLORS = {
  light: {
    PRIMARY: LIGHT,
    SECONDARY: DARK,
    TERTIARY: TERTIARY,
    BACKGROUND_COLOR: '#e6ffe6',
    LIGHT: LIGHT,
    DARK: DARK,
    LIGHT_GREEN: LIGHT_GREEN,
  },
  dark: {
    PRIMARY: DARK,
    SECONDARY: LIGHT,
    TERTIARY: TERTIARY,
    BACKGROUND_COLOR: '#14141f',
    LIGHT: LIGHT,
    DARK: DARK,
    LIGHT_GREEN: LIGHT_GREEN,
  },
};
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const colors = () => {
  return (
    <View>
      <Text>colors</Text>
    </View>
  )
}

export default colors

const styles = StyleSheet.create({})