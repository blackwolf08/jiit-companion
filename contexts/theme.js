import React, { useState } from 'react';
import { useColorScheme } from 'react-native-appearance';

import { Colors } from '../styles';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Colors.dark);

  let scheme = useColorScheme();

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
