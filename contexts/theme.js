import React, { useState, useEffect } from 'react';

import { Colors } from '../styles';
import { useUser } from './user';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useUser();

  const [theme, setTheme] = useState(Colors[user?.theme] || Colors.dark);

  useEffect(() => {
    setTheme(Colors[user?.theme] || Colors.dark);
  }, [user]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
