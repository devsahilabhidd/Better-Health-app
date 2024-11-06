import {StatusBar} from 'react-native';
import React from 'react';
import {TERTIARY} from './constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import AppNavigation from '.';
import {ThemeProvider} from './context/ThemeContext';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <>
      <GestureHandlerRootView>
        <PaperProvider>
          <AuthProvider>
            <ThemeProvider>
              <StatusBar backgroundColor={TERTIARY} />
              <AppNavigation />
            </ThemeProvider>
          </AuthProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;

