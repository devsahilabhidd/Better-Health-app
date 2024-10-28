import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  // const getTheme = 'dark';
  const getTheme = useColorScheme();
  // const getTheme = 'light';

  const [theme, setTheme] = useState(getTheme);
  useEffect(() => {
    setTheme(getTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
