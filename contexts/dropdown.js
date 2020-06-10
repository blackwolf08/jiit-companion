import React, { useRef } from "react";
import DropdownAlert from "react-native-dropdownalert";

const DropDownContext = React.createContext();

export const DropDownComponentProvider = ({ children }) => {
  let ref = useRef();
  return (
    <DropDownContext.Provider
      value={{
        ref,
      }}
    >
      <DropdownAlert ref={ref} />

      {children}
    </DropDownContext.Provider>
  );
};

export const useDropDown = () => React.useContext(DropDownContext);
