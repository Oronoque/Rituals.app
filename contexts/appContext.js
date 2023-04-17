import React, { createContext, useState } from 'react';

const AppContext = createContext({ id: null, isAuth: false });

const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    isAuth: false,
    id: null,
    token: null,
    expoToken: null,
    phoneNumber: null,
    phoneCode: null,
    isDarkTheme: false,
  });

  const updateAppData = (data) => {
    setAppData({
      ...appData,
      ...data,
    });
  };
  return <AppContext.Provider value={{ appData, updateAppData }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
