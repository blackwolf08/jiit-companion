import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import {
  OleoScript_400Regular,
  OleoScript_700Bold,
} from "@expo-google-fonts/oleo-script";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import {
  AuthProvider,
  DropDownComponentProvider,
  ThemeProvider,
  UserProvider,
} from "./contexts";
import { firebaseInit } from "./firebase";
import NavigationConatiner from "./navigation";
import { BottomDrawerProvider } from "./contexts";

// init firebase app
firebaseInit();

export default function App() {
  let [fontsLoaded] = useFonts({
    montserrat: Montserrat_400Regular,
    "montserrat-md": Montserrat_500Medium,
    "montserrat-sb": Montserrat_600SemiBold,
    "montserrat-bo": Montserrat_700Bold,
    "montserrat-eb": Montserrat_800ExtraBold,
    oleo: OleoScript_400Regular,
    "oleo-bo": OleoScript_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <DropDownComponentProvider>
      <UserProvider>
        <AuthProvider>
          <AppearanceProvider>
            <ThemeProvider>
              <BottomDrawerProvider>
                <NavigationConatiner />
              </BottomDrawerProvider>
            </ThemeProvider>
          </AppearanceProvider>
        </AuthProvider>
      </UserProvider>
    </DropDownComponentProvider>
  );
}
