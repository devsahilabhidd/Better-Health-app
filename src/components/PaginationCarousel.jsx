import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, DARK, LIGHT} from '../constants/colors';
import {ThemeContext} from '../context/ThemeContext';

const PaginationCarousel = ({items, paginationIndex}) => {
  const {theme} = useContext(ThemeContext);
  const activeColor = COLORS[theme];
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  paginationIndex === index ? activeColor.TERTIARY : 'gray',
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaginationCarousel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(20),
  },
  dot: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(10),
    // backgroundColor: 'gray',
    marginHorizontal: moderateScale(2),
  },
});
