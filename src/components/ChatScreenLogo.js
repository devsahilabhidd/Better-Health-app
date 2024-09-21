import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {DARK, PRIMARY, SECONDARY, TERTIARY} from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {dummyChats} from '../constants/dummyChats';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const ChatScreenLogo = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        //   borderWidth: 1,
        justifyContent: 'flex-start',
        gap: moderateScale(5),
        //   alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          // borderWidth: 1,
          // borderColor: 'white',
          width: moderateScale(40),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome
          name="arrow-left"
          size={moderateScale(20)}
          color={TERTIARY}
        />
      </Pressable>

      <Text
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
      </Text>
    </View>
  );
};

export default ChatScreenLogo;

const styles = StyleSheet.create({});
