import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS, DARK} from '../constants/colors';
import PaginationCarousel from './PaginationCarousel';
import Modal from 'react-native-modal';

const facts = [
  'Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique! 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.',
  'Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.so unique!sdf 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.',
  'FactDid you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique! 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside. 3',
  'FactDid you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique! 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside. 4',
  'Did you know that the worlds smallest fruit is the seed of a fig? Its tiny, almost microscopic, and its what makes figs so unique! 🤯 Each fig is actually an inverted flower with hundreds of these tiny fruits nestled inside.',
];

const {width} = Dimensions.get('window');

const FactsCarouselHome = () => {
  const {theme} = useContext(ThemeContext);
  const activeColor = COLORS[theme];
  const [paginationIndex, setPaginationIndex] = useState(0);
  const flatListRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modelText, setModelText] = useState('');
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  useEffect(() => {
    let autoScroll;
    if (!showModal) {
      autoScroll = setInterval(() => {
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
    }

    return () => clearInterval(autoScroll);
  }, [paginationIndex, showModal]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={facts}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) => (
          <>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModelText(item);
                  setShowModal(true);
                }}
                style={[
                  styles.itemContent,
                  {borderColor: activeColor.TERTIARY},
                ]}>
                <Text
                  style={[styles.itemText, {color: activeColor.SECONDARY}]}
                  numberOfLines={3}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.paginationContainer}>
        <PaginationCarousel items={facts} paginationIndex={paginationIndex} />
      </View>
      <Modal
        isVisible={showModal}
        animationIn="bounceInDown"
        animationOut="bounceOutDown"
        transparent={true}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        style={{
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flex: 0.4,
            backgroundColor: activeColor.PRIMARY,
            padding: moderateScale(25),
            borderTopRightRadius: moderateScale(20),
            borderTopLeftRadius: moderateScale(20),
            width: '110%',
            alignSelf: 'center',
            marginBottom: -moderateScale(20),
            // justifyContent: 'center',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.itemText, {color: activeColor.SECONDARY}]}>
              {modelText}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FactsCarouselHome;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(120),
  },
  itemContainer: {
    paddingHorizontal: moderateScale(10),
    width: width,
  },
  itemContent: {
    // backgroundColor: 'red',
    borderWidth: 3,
    borderRadius: moderateScale(10),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
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
