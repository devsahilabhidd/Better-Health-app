import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {PRIMARY, SECONDARY, TERTIARY} from './constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import AppNavigation from '.';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <>
      <GestureHandlerRootView>
        <PaperProvider>
        <ThemeProvider>
          <StatusBar backgroundColor={TERTIARY} />
          <AppNavigation />
          </ThemeProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
