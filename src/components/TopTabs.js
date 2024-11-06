import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';
import FoodCards from './FoodCards';
import PersonalCareCards from './PersonalCareCards';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {moderateScale} from 'react-native-size-matters';
import {featuresTitle, PERSONAL_CARE_TITLES} from '../constants/featuresTitle';
import {ThemeContext} from '../context/ThemeContext';

const TopTabs = () => {
  const TopTab = createMaterialTopTabNavigator();
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
          color: activeColor.SECONDARY,
          backgroundColor: activeColor.PRIMARY,
          fontSize: moderateScale(14),
          fontWeight: '500',
          textAlign: 'center',
        },
        tabBarIndicatorStyle: {
          height: moderateScale(2.5),
          backgroundColor: activeColor.TERTIARY,
        },
        tabBarStyle: {
          backgroundColor: activeColor.PRIMARY,
        },
      }}>
      <TopTab.Screen
        name="Food"
        component={FoodCards}
        initialParams={{items: featuresTitle}}
      />
      <TopTab.Screen
        name="Personal Care"
        component={FoodCards}
        initialParams={{items: PERSONAL_CARE_TITLES}}
      />
    </TopTab.Navigator>
  );
};

export default TopTabs;
