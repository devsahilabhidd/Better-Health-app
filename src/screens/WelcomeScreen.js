import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LIGHT_GREEN, PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: PRIMARY}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          padding: moderateScale(10),
        }}>
        {/* <Text
          style={{
            flexDirection: 'row',
            fontWeight: 'bold',
            color: SECONDARY,
            fontSize: moderateScale(20),
          }}>
          Better
          <FontAwesome5
            name="running"
            size={moderateScale(25)}
            color={TERTIARY}
          />
          <Text>
            <Text
              style={{
                color: TERTIARY,
              }}>
              Health
            </Text>
          </Text>
        </Text> */}
      </View>
      <View
        style={{
          padding: moderateScale(10),
          justifyContent: 'center',
          alignItems: 'center',
          gap: verticalScale(150),
        }}>
        <View style={{gap: verticalScale(10)}}>
          <Text
            style={{
              textAlign: 'center',
              color: SECONDARY,
              fontWeight: '900',
              fontSize: moderateScale(40),
            }}>
            Welcome to <Text style={{color: TERTIARY}}>Better Health</Text> Your
            Personalized Health Assistant
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: SECONDARY,
              fontWeight: '400',
              fontSize: moderateScale(15),
            }}>
            Empower your health journey with smarter choices.
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? LIGHT_GREEN : TERTIARY,
            },
            {
              padding: moderateScale(5),
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(5),
            },
          ]}>
          <Text
            className="text-primary font-bold"
            style={{
              color: PRIMARY,
              fontSize: moderateScale(20),
              fontWeight: '500',
            }}>
            Home Page
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
