import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Modal from 'react-native-modal';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
import {moderateScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const EditeProfileMenu = ({showEditeProfileMenu}) => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <Modal isVisible={showEditeProfileMenu}>
      <View style={styles.container(activeColor)}>
        {/* Header */}
        <View style={styles.headerContainer(activeColor)}>
          {/* title */}
          <View>
            <Text style={styles.headerTitle(activeColor)}>Edit Profile</Text>
          </View>
          {/* Close button */}
          <TouchableOpacity>
            <MaterialIcons
              name={'close'}
              size={moderateScale(25)}
              color={activeColor.SECONDARY}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditeProfileMenu;

const styles = StyleSheet.create({
  container: activeColor => ({
    flex: 1,
    backgroundColor: activeColor.PRIMARY,
    borderRadius: moderateScale(20),
    width: '105%',
    alignSelf: 'center',
  }),
  headerContainer: activeColor => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: moderateScale(10),
    padding: moderateScale(10),
  }),
  headerTitle: activeColor => ({
    color: activeColor.SECONDARY,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  }),
});
