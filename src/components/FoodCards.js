import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  COLORS,
  DARK,
  LIGHT_GREEN,
  PRIMARY,
  SECONDARY,
  TERTIARY,
} from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MasonryFlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../context/ThemeContext';

const FoodCards = ({route}) => {
  const {items} = route.params;
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <View
      style={[styles.cardContainer, {backgroundColor: activeColor.PRIMARY}]}>
      <MasonryFlashList
        data={items}
        numColumns={2}
        keyExtractor={item => item.id} // Ensure that the keyExtractor is explicitly provided
        renderItem={({item}) => (
          <Pressable
            key={item.id} // Ensure the key is directly passed
            onPress={() => {
              const screen = item.screen || 'ChatScreen';
              // navigation.navigate('ChatScreen');
              navigation.navigate(screen);
            }}
            style={({pressed}) => [
              {
                borderColor: pressed ? LIGHT_GREEN : activeColor.TERTIARY,
                backgroundColor: activeColor.PRIMARY,
              },
              styles.card,
            ]}
            // style={[styles.card, {backgroundColor: item.color}]}
          >
            <Text style={[styles.cardText, {color: activeColor.SECONDARY}]}>
              {item.title}
            </Text>
            <FontAwesome5
              name="long-arrow-alt-right"
              size={moderateScale(20)}
              color={activeColor.SECONDARY}
            />
          </Pressable>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default FoodCards;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingTop: moderateScale(30),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderWidth: 3,
    // borderColor: TERTIARY,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
    // maxWidth: '40%',
    elevation: 1,
  },
  cardText: {
    color: DARK,
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
});
