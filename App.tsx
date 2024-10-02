import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation';
import {PRIMARY, TERTIARY} from './src/constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <>
      <GestureHandlerRootView>
        <PaperProvider>
          <StatusBar backgroundColor={TERTIARY} />
          <AppNavigation />
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
