import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {PRIMARY, TERTIARY} from './constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import AppNavigation from './navigation';
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
