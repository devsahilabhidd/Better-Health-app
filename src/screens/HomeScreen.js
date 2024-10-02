import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TopTabs from '../components/TopTabs';

const HomeScreen = () => {
  return (
    <View
      style={{
        // borderWidth: 1,
        flex: 1,
        backgroundColor: PRIMARY,
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
        <Text
          style={{
            fontWeight: 'bold',
            color: SECONDARY,
            fontSize: moderateScale(40),
          }}>
          Better
        </Text>
        {/* <FontAwesome5
          name="running"
          size={moderateScale(50)}
          color={TERTIARY}
        /> */}
        <Text
          style={{
            fontWeight: 'bold',
            color: TERTIARY,
            fontSize: moderateScale(40),
          }}>
          Health
        </Text>
      </View>

      {/* <FoodCards /> */}
      <TopTabs />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 3,
    borderColor: SECONDARY,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
    width: '40%',
  },
  cardText: {
    color: SECONDARY,
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
});
