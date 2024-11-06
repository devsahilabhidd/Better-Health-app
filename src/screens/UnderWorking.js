import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {ThemeContext} from '../context/ThemeContext';

const UnderWorking = () => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10),
        backgroundColor: activeColor.PRIMARY,
      }}>
      <Ionicons
        name="construct"
        size={moderateScale(70)}
        color={activeColor.TERTIARY}
      />
      <Text style={{color: activeColor.TERTIARY}}>Under Construction</Text>
    </View>
  );
};

export default UnderWorking;
