import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  OleoScript_400Regular,
  OleoScript_700Bold,
} from "@expo-google-fonts/oleo-script";
import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";
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
import { ErrorBoundary } from "./components";

// init firebase app
firebaseInit();

export default function App() {
  let [fontsLoaded] = useFonts({
    montserrat: Montserrat_400Regular,
    roboto: Roboto_400Regular,
    "montserrat-md": Montserrat_500Medium,
    "montserrat-sb": Montserrat_600SemiBold,
    "montserrat-bo": Montserrat_700Bold,
    "montserrat-eb": Montserrat_800ExtraBold,
    "roboto-md": Roboto_500Medium,
    "roboto-bo": Roboto_700Bold,
    oleo: OleoScript_400Regular,
    "oleo-bo": OleoScript_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
