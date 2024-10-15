import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Modal from 'react-native-modal';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
const LoadingModel = ({showModelLoading}) => {
  const {theme} = useContext(ThemeContext);
  let activeColor = COLORS[theme];
  return (
    <Modal isVisible={showModelLoading}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={activeColor.TERTIARY} />
      </View>
    </Modal>
  );
};

export default LoadingModel;

const styles = StyleSheet.create({});
