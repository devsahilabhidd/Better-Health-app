import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(true);
  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async username => {
    setIsLoading(true);
    try {
      setUserInfo(username);
      await AsyncStorage.setItem('userInfo', username);
    } catch (error) {
      console.log('Error here ----> ', error);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem('userInfo');
    setUserInfo('');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);

      console.log(`is logged in error ${e}`);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
        logout,
        userInfo,
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
