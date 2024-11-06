import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {COLORS} from '../constants/colors';
import {ThemeContext} from '../context/ThemeContext';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Buttom = ({title, textColor, borderColor, color, onPress}) => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <TouchableOpacity
      onPress={() => {
        onPress() ;
      }}
      style={{
        borderWidth: 1,
        borderColor: borderColor || activeColor.SECONDARY,
        borderRadius: moderateScale(20),
        width: '80%',
        padding: moderateScale(10),
        margin: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: moderateScale(10),
        backgroundColor: color,
      }}>
      <Text
        className="text-primary font-bold"
        style={{
          color: textColor || activeColor.SECONDARY,
          fontWeight: '500',
          fontSize: moderateScale(15),
        }}>
        {title || 'Button'}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttom;

const styles = StyleSheet.create({});
