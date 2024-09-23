import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {DARK, PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {featuresTitle} from '../constants/featuresTitle';
import {MasonryFlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

const FoodCards = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <MasonryFlashList
        data={featuresTitle}
        numColumns={2}
        keyExtractor={item => item.id} // Ensure that the keyExtractor is explicitly provided
        renderItem={({item}) => (
          <Pressable
            key={item.id} // Ensure the key is directly passed
            onPress={() => {
              const screen = item.screen || 'ChatScreen';
              // navigation.navigate('DemoChat');
              // navigation.navigate('ChatScreen');
              navigation.navigate(screen);
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? TERTIARY : item.color,
              },
              styles.card,
            ]}
            // style={[styles.card, {backgroundColor: item.color}]}
          >
            <Text style={styles.cardText}>{item.title}</Text>
            <FontAwesome5
              name="long-arrow-alt-right"
              size={moderateScale(20)}
              color={DARK}
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
    backgroundColor: PRIMARY,
  },
  card: {
    // borderWidth: 3,
    // borderColor: SECONDARY,
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
