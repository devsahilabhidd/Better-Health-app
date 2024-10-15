import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {moderateScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModel from '../components/LoadingModel';

const Profile = () => {
  const {logout} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];

  const [showModelLoading, setShowModelLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles(activeColor).container,
        {backgroundColor: activeColor.PRIMARY},
      ]}>
      {/* Profile Section */}
      <View style={styles(activeColor).profileContainer}>
        <View style={styles(activeColor).profileIconContainer}>
          <MaterialIcons
            name="account-circle"
            size={moderateScale(120)}
            color={activeColor.SECONDARY}
          />
        </View>
        <Text
          style={[
            styles(activeColor).nameText,
            {color: activeColor.SECONDARY},
          ]}>
          Guest
        </Text>

        {/* User Info Cards */}
        <View style={styles(activeColor).infoContainer}>
          <InfoItem
            icon="cake"
            text="20 years old"
            color={activeColor.SECONDARY}
          />
          <InfoItem icon="male" text="Male" color={activeColor.SECONDARY} />
          <InfoItem
            icon="medical-services"
            text="Diabetes"
            color={activeColor.SECONDARY}
          />
          <InfoItem
            icon="fitness-center"
            text="Want to gain weight"
            color={activeColor.SECONDARY}
          />
        </View>
      </View>

      <LoadingModel showModelLoading={showModelLoading} />

      {/* Logout button */}
      <View
        style={{
          // borderWidth: 1,
          height: moderateScale(80),
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: moderateScale(20),
        }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('LOGOUT', 'Are you sure you want to logout', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  setShowModelLoading(true);
                  logout();
                  setTimeout(() => {
                    setShowModelLoading(false);
                    navigation.navigate('Welcome');
                  }, 2000);
                },
              },
            ]);
          }}
          style={styles(activeColor).logoutButton}>
          <MaterialIcons
            name="logout"
            size={moderateScale(20)}
            color={activeColor.DANGER}
          />
          <Text
            style={[
              styles(activeColor).logoutText,
              {color: activeColor.DANGER},
            ]}>
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles(activeColor).logoutButton}>
          <Text
            style={[
              styles(activeColor).logoutText,
              {color: activeColor.TERTIARY},
            ]}>
            Edit Profile
          </Text>
          <MaterialCommunityIcons
            name="account-edit"
            size={moderateScale(25)}
            color={activeColor.TERTIARY}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoItem = ({icon, text, color, activeColor}) => (
  <View style={styles(activeColor).infoItem}>
    <MaterialIcons name={icon} size={moderateScale(24)} color={color} />
    <Text style={[styles(activeColor).infoText, {color}]}>{text}</Text>
  </View>
);

export default Profile;

const styles = activeColor =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: moderateScale(40),
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      // position: 'absolute',
      // top: moderateScale(40),
      // left: moderateScale(20),
      // zIndex: 1,
    },
    logoutText: {
      marginLeft: moderateScale(5),
      fontSize: moderateScale(16),
      fontWeight: '600',
    },
    profileContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(20),
    },
    profileIconContainer: {
      marginBottom: moderateScale(20),
      borderRadius: moderateScale(100),
      borderWidth: moderateScale(2),
      borderColor: COLORS.dark.TERTIARY,
      padding: moderateScale(10),
    },
    nameText: {
      fontSize: moderateScale(28),
      fontWeight: 'bold',
      marginBottom: moderateScale(20),
    },
    infoContainer: {
      width: '100%',
      padding: moderateScale(10),
      borderWidth: moderateScale(2),
      borderColor: COLORS.dark.TERTIARY,
      borderRadius: moderateScale(10),
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(15),
      padding: moderateScale(10),
      borderRadius: moderateScale(8),
    },
    infoText: {
      marginLeft: moderateScale(10),
      fontSize: moderateScale(16),
    },
  });
