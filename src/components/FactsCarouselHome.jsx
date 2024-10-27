import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useState, useRef, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS, DARK} from '../constants/colors';
import PaginationCarousel from './PaginationCarousel';

const facts = [
  'Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique! 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.',
  'Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.',
  'Fact 3',
  'Fact 4',
];

const {width} = Dimensions.get('window');

const FactsCarouselHome = () => {
  const {theme} = useContext(ThemeContext);
  const activeColor = COLORS[theme];
  const [paginationIndex, setPaginationIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (paginationIndex < facts.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: paginationIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [paginationIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={facts}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={[styles.itemContent, {borderColor: activeColor.TERTIARY}]}>
              <Text style={[styles.itemText, {color: activeColor.SECONDARY}]}>
                {item}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.paginationContainer}>
        <PaginationCarousel items={facts} paginationIndex={paginationIndex} />
      </View>
    </View>
  );
};

export default FactsCarouselHome;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(200),
  },
  itemContainer: {
    paddingHorizontal: moderateScale(20),
    width: width,
  },
  itemContent: {
    borderWidth: 3,
    borderRadius: moderateScale(10),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  itemText: {
    color: DARK,
    fontWeight: '500',
    fontSize: moderateScale(15),
    textAlign: 'justify',
  },
  paginationContainer: {
    height: moderateScale(30),
    justifyContent: 'center',
  },
});
