import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {COLORS} from '../constants/colors';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {moderateScale} from 'react-native-size-matters';
const ScannerScreen = () => {
  const {theme} = useContext(ThemeContext);
  const activeColor = COLORS[theme];
  const buttonTextStyle = {
    color: activeColor.SECONDARY,
  };


  return (
    <>
      <View style={{flex: 1, backgroundColor: activeColor.PRIMARY}}>
        <ProgressSteps
          borderWidth={2}
          borderStyle={'solid'}
          borderColor={activeColor.GRAY}
          progressBarColor={activeColor.GRAY}
          completedProgressBarColor={activeColor.TERTIARY}
          activeStepIconBorderColor={activeColor.TERTIARY}
          disabledStepIconColor={activeColor.GRAY}
          completedStepIconColor={activeColor.TERTIARY}
          activeLabelColor={activeColor.SECONDARY}
          labelColor={activeColor.GRAY}
          completedLabelColor={activeColor.TERTIARY}
          completedStepNumColor={activeColor.SECONDARY}
          activeStepNumColor={activeColor.SECONDARY}>
          <ProgressStep
            label="Scan front of the label"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: activeColor.TERTIARY}}>
                This is the content within step 1!
              </Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Scan Ingredients"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center'}}>
              {/* <Text>This is the content within step 1!</Text> */}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Scan Nutrition Facts"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={{alignItems: 'center', borderStyle: 'dotted'}}>
              {/* <Text>This is the content within step 2!</Text> */}
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  circle: selectedStep => {
    return {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: selectedStep > 0 ? 'green' : '#f2f2f2',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
  line: {
    width: 2,
    height: 100,
    backgroundColor: '#f2f2f2',
  },
});
