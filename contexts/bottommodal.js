import React, { useState } from "react";

const BottomDrawerContext = React.createContext();

export const BottomDrawerProvider = ({ children }) => {
  const [isVisible, setisVisible] = useState(false);
  return (
    <BottomDrawerContext.Provider
      value={{
        isVisible,
        setisVisible,
      }}
    >
      {children}
    </BottomDrawerContext.Provider>
  );
};

export const useBottomModal = () => React.useContext(BottomDrawerContext);
