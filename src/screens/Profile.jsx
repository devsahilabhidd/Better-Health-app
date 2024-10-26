import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {moderateScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingModel from '../components/LoadingModel';
import EditeProfileMenu from '../components/EditeProfileMenu';

const Profile = () => {
  const {logout} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const activeColor = COLORS[theme];

  const [showModelLoading, setShowModelLoading] = useState(false);
  const [showEditeProfileMenu, setShowEditeProfileMenu] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles(activeColor).container,
        {backgroundColor: activeColor.PRIMARY},
      ]}>
      {/* Logout button */}
      <View
        style={{
          // borderWidth: 1,
          height: moderateScale(50),
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
        <TouchableOpacity
          onPress={() => {
            setShowEditeProfileMenu(true);
          }}
          style={styles(activeColor).logoutButton}>
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

      {/* Profile Section */}
      <View style={styles(activeColor).profileContainer}>
        {/* Image name and email */}
        <View
          style={{
            // borderWidth: 1,
            padding: moderateScale(10),
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            marginBottom: moderateScale(20),
          }}>
          <View style={styles(activeColor).profileIconContainer}>
            <MaterialIcons
              name="account-circle"
              size={moderateScale(90)}
              color={activeColor.SECONDARY}
            />
          </View>
          <View>
            <Text
              style={[
                styles(activeColor).nameText,
                {color: activeColor.SECONDARY},
              ]}>
              Danish
            </Text>
            <Text
              style={[
                styles(activeColor).emailText,
                {color: activeColor.SECONDARY},
              ]}>
              danishdeshmukh@gmail.com
            </Text>
          </View>
        </View>
        {/* Personal Info */}
        <View style={styles(activeColor).infoContainer}>
          <Text style={[styles(activeColor).infoHeadingText(activeColor)]}>
            Personal Info
          </Text>
          <InfoItem
            icon="person"
            text="Danish Deshmukh "
            color={activeColor.SECONDARY}
          />
          <InfoItem
            icon="cake"
            text="20 years old"
            color={activeColor.SECONDARY}
          />
          <InfoItem icon="male" text="Male" color={activeColor.SECONDARY} />

          <InfoItem icon="height" text="172 cm" color={activeColor.SECONDARY} />
          <InfoItem
            icon="monitor-weight"
            text="55 kg"
            color={activeColor.SECONDARY}
          />
          <InfoItem
            icon="location-on"
            text="Mahrashtra, India"
            color={activeColor.SECONDARY}
          />
          <InfoItem
            icon="work"
            text="Software Developer"
            color={activeColor.SECONDARY}
          />
        </View>
        {/* Goal */}
        <View style={styles(activeColor).infoContainer}>
          <Text style={[styles(activeColor).infoHeadingText(activeColor)]}>
            Goal
          </Text>
          <InfoItem
            icon="fitness-center"
            text="Want to gain weight"
            color={activeColor.SECONDARY}
          />
        </View>

        {/* Dietary Preferences */}
        <View style={styles(activeColor).infoContainer}>
          <Text style={[styles(activeColor).infoHeadingText(activeColor)]}>
            Dietary Preferences
          </Text>
          <InfoItem
            icon="restaurant"
            text="Vegetarian"
            color={activeColor.SECONDARY}
          />
        </View>

        {/* Allergies */}
        <View style={styles(activeColor).infoContainer}>
          <Text style={[styles(activeColor).infoHeadingText(activeColor)]}>
            Allergies
          </Text>
          <InfoItem
            icon="bug-report"
            text="Peanuts"
            color={activeColor.SECONDARY}
          />
          <InfoItem
            icon="bug-report"
            text="Lactose Intolerance"
            color={activeColor.SECONDARY}
          />
        </View>
        {/* Medical Conditions */}
        <View style={styles(activeColor).infoContainer}>
          <Text style={[styles(activeColor).infoHeadingText(activeColor)]}>
            Medical Conditions
          </Text>
          <InfoItem
            icon="medical-services"
            text="Diabetes"
            color={activeColor.SECONDARY}
          />
          <InfoItem
            icon="healing"
            text="Asthma"
            color={activeColor.SECONDARY}
          />
        </View>
      </View>

      <LoadingModel showModelLoading={showModelLoading} />
      <EditeProfileMenu
        showEditeProfileMenu={showEditeProfileMenu}
        setShowEditeProfileMenu={setShowEditeProfileMenu}
      />
    </ScrollView>
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
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutText: {
      marginLeft: moderateScale(5),
      fontSize: moderateScale(16),
      fontWeight: '600',
    },
    profileContainer: {
      // borderWidth: 1,
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(10),
    },
    profileIconContainer: {
      padding: moderateScale(10),
    },
    nameText: {
      fontSize: moderateScale(28),
      fontWeight: 'bold',
      // marginBottom: moderateScale(20),
    },
    emailText: {
      fontSize: moderateScale(14),
      fontWeight: 'bold',
      // marginBottom: moderateScale(20),
    },
    infoContainer: {
      width: '100%',
      padding: moderateScale(10),
      borderWidth: moderateScale(1),
      borderColor: COLORS.dark.TERTIARY,
      borderRadius: moderateScale(20),
      marginBottom: moderateScale(20),
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(10),
      padding: moderateScale(10),
      borderRadius: moderateScale(8),
    },
    infoHeadingText: activeColor => ({
      marginLeft: moderateScale(10),
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      color: activeColor.SECONDARY,
      margin: moderateScale(5),
    }),

    infoText: {
      marginLeft: moderateScale(10),
      fontSize: moderateScale(16),
    },
  });
