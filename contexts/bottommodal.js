import React, { useState } from "react";

const BottomDrawerContext = React.createContext();

export const BottomDrawerProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    className: null,
    isVisible: false,
  });
  return (
    <BottomDrawerContext.Provider
      value={{
        modalData,
        setModalData,
      }}
    >
      {children}
    </BottomDrawerContext.Provider>
  );
};

export const useBottomModal = () => React.useContext(BottomDrawerContext);
