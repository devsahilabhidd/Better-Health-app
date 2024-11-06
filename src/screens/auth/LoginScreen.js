import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import BetterHealthLogo from '../../components/BetterHealthLogo';
import {ThemeContext} from '../../context/ThemeContext';
import {COLORS} from '../../constants/colors';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Buttom from '../../components/Buttom';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import LoadingModel from '../../components/LoadingModel';

const LoginScreen = () => {
  const {userInfo, login} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  const [showModelLoading, setShowModelLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColor.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        // gap: moderateScale(10),
      }}>
      <View>
        <BetterHealthLogo />
      </View>
      <Buttom
        onPress={() => {
          setShowModelLoading(true);
          setTimeout(() => {
            login('Guest');
            setShowModelLoading(false);
            navigation.navigate('BottomTab');
          }, 2000);
        }}
        title={'Login as a Guest'}
      />
      <View>
        <Text style={{color: activeColor.SECONDARY}}>OR</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          ToastAndroid.show(
            'Login as a Guest please, this feature is under construction right now',
            2000,
          );
        }}
        style={{
          borderWidth: 1,
          borderColor: activeColor.SECONDARY,
          borderRadius: moderateScale(20),
          width: '80%',
          padding: moderateScale(10),
          margin: moderateScale(10),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: moderateScale(10),
        }}>
        <FontAwesome name="google" size={25} color={activeColor.SECONDARY} />
        <Text
          style={{
            color: activeColor.SECONDARY,
            fontWeight: '500',
            fontSize: moderateScale(15),
          }}>
          Login with Google
        </Text>
      </TouchableOpacity>

      <LoadingModel showModelLoading={showModelLoading} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
